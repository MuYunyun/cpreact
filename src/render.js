import * as _ from 'diana'

/**
 * 将虚拟 DOM 转化为真实 DOM
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
  if (_.isFunction(vdom.nodeName)) {
    let component, returnVdom
    if (vdom.nodeName.prototype.render) {
      component = new vdom.nodeName(vdom.attributes)
      returnVdom = component.render()
    } else {
      returnVdom = vdom.nodeName(vdom.attributes) // 处理无状态组件：const A = (props) => <div>I'm {props.name}</div>
    }
    render(returnVdom, container)
    return
  }
  if (_.isString(vdom) || _.isNumber(vdom)) {
    container.innerText = container.innerText + vdom // fix <div>I'm {this.props.name}</div>
    return
  }
  const dom = document.createElement(vdom.nodeName)
  for (let attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(vdomChild => render(vdomChild, dom))
  container.appendChild(dom)
}

// 明天的目标：render 函数中抽离出 container，以便 setState 函数中中复用

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

export default render