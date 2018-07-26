import * as _ from 'diana'
import { diff } from './vdom/diff'

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
  container.appendChild(dom)
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
  return component
}

/**
 * 更改属性，componentWillMount 和 componentWillReceiveProps 方法
 */
function setProps(component) {
  // 此处加上 diff 逻辑，完美！
  if (component && component.componentWillMount) {
    component.componentWillMount()
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props)
  }
}

/**
 * 自定义组件渲染逻辑
 * @param {*} component
 */
function renderComponent(component) {
  if (component.base && component.shouldComponentUpdate) {
    const bool = component.shouldComponentUpdate(component.props, component.state)
    if (!bool && bool !== undefined) {
      return false // shouldComponentUpdate() 返回 false，则生命周期终止
    }
  }
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }

  const rendered = component.render()

  let base
  if (component.base) {
    // base = diff(component.base, rendered)
  } else {
    base = vdomToDom(rendered) // 子组件渲染完父组件才渲染完
  }

  // if (component.base.parentNode) { // setState
  //   component.base.parentNode.replaceChild(base, component.base)
  // }

  if (component.base && component.componentDidUpdate) {
    component.componentDidUpdate()
  } else if (component && component.componentDidMount) {
    component.componentDidMount()
  }

  component.base = base      // 标志符
  base._component = component
}

/**
 * render 函数中抽离出 vdomToDom, 从而能在 setState 函数中复用
 * @param {*} vdom vdom
 * @return dom
 */
function vdomToDom(vdom) {
  if (_.isFunction(vdom.nodeName)) { // 为了更加方便地书写生命周期逻辑，将自定义组件逻辑和一般 html 标签的逻辑分离开
    const component = createComponent(vdom)
    setProps(component)
    renderComponent(component)
    return component.base
  }
  if (_.isString(vdom) || _.isNumber(vdom)) {
    const textNode = document.createTextNode(vdom)
    return textNode // 待测验 <div>I'm {this.props.name}</div>
  }
  const dom = document.createElement(vdom.nodeName)
  for (const attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(vdomChild => render(vdomChild, dom))
  return dom
}

/**
 * 给 dom 赋上相应属性
 * @param {*} dom
 * @param {*} attr
 * @param {*} value
 */
function setAttribute(dom, attr, value) {
  if (attr === 'className') {
    attr = 'class'
  }
  if (attr.match(/on\w+/)) {        // 处理事件的属性:
    const eventName = attr.toLowerCase().substr(2)
    dom.addEventListener(eventName, value)
  } else if (attr === 'style') {    // 处理样式的属性:
    let styleStr = ''
    let standardCss
    for (let klass in value) {
      standardCss = humpToStandard(klass)
      value[klass] = _.isNumber(+value[klass]) ? value[klass] + 'px' : value[klass] // style={{ className: '20' || '20px' }}>
      styleStr += `${standardCss}: ${value[klass]};`
    }
    dom.setAttribute(attr, styleStr)
  } else if (attr === 'key') {
    dom[attr] = value
  } else {                          // 其它属性
    dom.setAttribute(attr, value)
  }
}

export { render, renderComponent, vdomToDom, setAttribute }
