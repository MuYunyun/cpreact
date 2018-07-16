import * as _ from 'diana'

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
  const dom = _render(vdom)
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
  if (component && component.componentWillMount) {
    component.componentWillMount()
  } else if (component.base && component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props)
  }
}

/**
 * 渲染自定义组件逻辑
 * @param {*} component
 */
function renderComponent(component) {
  const rendered = component.render()
  if (component.base && component.shouldComponentUpdate) {
    const bool = component.shouldComponentUpdate(component.props, component.state)
    if (!bool && bool !== undefined) {
      return false // shouldComponentUpdate() 返回 false，则生命周期终止
    }
  }
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }

  const base = _render(rendered)

  if (component.base && component.componentDidUpdate) {
    component.componentDidUpdate()
  } else if (component && component.componentDidMount) {
    component.componentDidMount()
  }

  if (component.base && component.base.parentNode) { // setState
    component.base.parentNode.replaceChild(base, component.base)
  }

  component.base = base  // 标志符
}

/**
 * render 函数中抽离出 _render, 从而能在 setState 函数中中复用
 * @param {*} vdom vdom
 * @param {*} container 需要插入的位置
 * return dom
 */
function _render(vdom) {
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
 * 给节点设置属性
 * @param {*} dom   操作元素
 * @param {*} attr  操作元素属性
 * @param {*} value 操作元素值
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
  } else {                          // 其它属性
    dom.setAttribute(attr, value)
  }
}

export { render, _render, renderComponent }