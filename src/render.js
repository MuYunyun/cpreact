import { isFunction, isNumber, isString, isArray } from 'diana'
import { diff } from './vdom/diff'
import { humpToStandard, defer } from './util'

/**
 * 将虚拟 DOM 转化为真实 DOM 后插入指定位置
 * @param {*} vdom      虚拟 DOM
 * @param {*} container 需要插入的位置
 * // {
  //   attributes: {className: "title"}
  //   children: ["hello", t] // t 和外层对象相同
  //   key: undefined
  //   nodeName: "div"        // 如果是自定义组件则变为 nodeName: ƒ A()
  // }
 */
function render(vdom, container) {
  const dom = vdomToDom(vdom)
  container && container.appendChild(dom) // 兼容沙盒模式
}

/**
 * 构造自定义组件
 * @param {*} vdom
 */
function createComponent(vdom) {
  let component = {}
  if (vdom.nodeName.prototype.render) {
    component = new vdom.nodeName(vdom.attributes)
  } else { // 处理无状态组件：const A = (props) => <div>I'm {props.name}</div>
    component.render = function() {
      return vdom.nodeName(vdom.attributes)
    }
  }
  if (vdom.nodeName.defaultProps) { // 是否具有 defaultProps 属性
    component.props = Object.assign({}, vdom.nodeName.defaultProps, component.props)
  }
  return component
}

/**
 * 更改属性，componentWillMount 和 componentWillReceiveProps 方法
 */
function setProps(component, attributes) {
  if (attributes) { // 自定义组件比较中新老组件相同时 setProps 的逻辑
    component.props = attributes
  }

  if (component && component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props)
  } else if (component && component.componentWillMount) {
    component.componentWillMount()
  }
}

/**
 * 自定义组件渲染逻辑
 * @param {*} component
 */
function renderComponent(component) {
  if (component.base && component.shouldComponentUpdate && component.allowShouldComponentUpdate !== false) {
    const bool = component.shouldComponentUpdate(component.props, component.state)
    if (!bool && bool !== undefined) {
      return false // shouldComponentUpdate() 返回 false，则生命周期终止
    }
  }
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate.call(component)
  }

  const rendered = component.render()

  let base
  if (component.base) {
    base = diff(component.base, rendered)
  } else {
    base = vdomToDom(rendered) // 子组件渲染完父组件才渲染完
  }

  if (component.base) {
    component.componentDidUpdate ? component.componentDidUpdate() : void 0
  } else if (component && component.componentDidMount) {
    defer(component.componentDidMount.bind(component))
  }

  component.base = base        // 将新得到的 dom 赋到 component 上
  if (!isFunction(rendered.nodeName)) { // 见 [踩坑日志](https://github.com/MuYunyun/cpreact/issues/2)
    base._component = component  // 同时将 component 赋到新得到的 dom 上
  }
}

/**
 * render 函数中抽离出 vdomToDom, 从而能在 setState 函数中复用
 * @param {*} vdom vdom
 * @return dom
 */
function vdomToDom(vdom) {
  if (isFunction(vdom.nodeName)) { // 为了更加方便地书写生命周期逻辑，将自定义组件逻辑和一般 html 标签的逻辑分离开
    const component = createComponent(vdom)
    setProps(component)
    for (const attr in vdom.attributes) { // 处理自定义组件的 ref 属性
      if (attr === 'ref' && isFunction(vdom.attributes[attr])) {
        vdom.attributes[attr](component)
      }
    }
    renderComponent(component)
    return component.base
  }
  if (isString(vdom) || isNumber(vdom)) {
    const textNode = document.createTextNode(vdom)
    return textNode // 待测验 <div>I'm {this.props.name}</div>
  }
  const dom = document.createElement(vdom.nodeName)
  if (vdom.attributes
    && vdom.attributes.hasOwnProperty('onChange')
    && vdom.attributes.hasOwnProperty('value')) { // 受控组件逻辑，`onChange` 的 input 事件绑定优先于 `value` 的 input 事件绑定
      dom.setAttribute('value', vdom.attributes['value'])
      const oldValue = dom.value
      const changeCb = vdom.attributes['onChange']
      dom.addEventListener('input', (e) => {
        changeCb.call(this, e)
        dom.value = oldValue
      })
      delete vdom.attributes['onChange']
      delete vdom.attributes['value']
    }
  if (vdom.attributes
    && !vdom.attributes.hasOwnProperty('onChange')
    && vdom.attributes.hasOwnProperty('value')) { // 受控组件逻辑
    dom.setAttribute('value', vdom.attributes['value'])
    const oldValue = dom.value
    dom.addEventListener('input', (e) => {
      dom.value = oldValue
    })
    delete vdom.attributes['value']
  }
  for (const attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }

  vdom.children && vdom.children.forEach(vdomChild => {
    if (isArray(vdomChild)) { // https://github.com/MuYunyun/cpreact/issues/9
      vdomChild.forEach(vdomChild2 => {
        render(vdomChild2, dom)
      })
    } else {
      render(vdomChild, dom)
    }
  })
  return dom
}

/**
 * 给 dom 赋上相应属性
 * @param {*} dom
 * @param {*} attr
 * @param {*} value
 */
function setAttribute(dom, attr, value) {
  if (attr === 'className') { attr = 'class' }
  if (attr === 'htmlFor') { attr = 'for' }
  if (attr === 'disabled' || attr === 'autofocus') {
    if (value === false) { /* not handle */ }
    else { dom.setAttribute(attr, true) }
  } else if (attr.match(/on\w+/)) {        // 处理事件的属性:
    let eventName = attr.toLowerCase().substr(2)
    if (eventName === 'change') { eventName = 'input' } // https://github.com/MuYunyun/blog/blob/master/从0到1实现React/9.onChange事件的那点事.md
    dom.addEventListener(eventName, value.bind(this)) // https://github.com/MuYunyun/cpreact/issues/4
  } else if (attr === 'style') {    // 处理样式的属性:
    let styleStr = ''
    let standardCss
    for (let klass in value) {
      standardCss = humpToStandard(klass)
      value[klass] = isNumber(+value[klass]) ? value[klass] + 'px' : value[klass] // style={{ className: '20' || '20px' }}>
      styleStr += `${standardCss}: ${value[klass]};`
    }
    dom.setAttribute(attr, styleStr)
  } else if (attr === 'key') {
    dom[attr] = value
  } else if (attr === 'ref') {
    if (isFunction(value)) {
      value(dom)
    }
  } else {                          // 其它属性
    dom.setAttribute(attr, value)
  }
}

export { render, renderComponent, vdomToDom, setAttribute, setProps }
