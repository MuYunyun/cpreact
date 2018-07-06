import { humpToStandard } from './util'

const React = {
  createElement
}

/**
 * 将 JSX 转化为 虚拟 DOM
 * @param {*} tag 标签类型
 * @param {*} attr 属性
 * @param {*} child 子属性
 * const title = <h1 className="title">Hello, world!</h1> =>
 * {
    attributes: {className: "title"}
    children: ["Hello, world!"]
    key: undefined
    nodeName: "h1"
  }
 */
function createElement(tag, attr, ...child) {
  return {
    attributes: attr,
    children: child,
    key: undefined,
    nodeName: tag,
  }
}

const ReactDOM = {
  render(vdom, container) {
    container.innerHTML = null // 在热更新之前清空之前的 dom 元素
    render(vdom, container)
  }
}

/**
 * 将虚拟 DOM 转化为真实 DOM
 * @param {*} vdom      虚拟 DOM
 * @param {*} container 需要插入的位置
 * // {
  //   attributes: {className: "title"}
  //   children: ["hello", t] // t 和外层对象相同
  //   key: undefined
  //   nodeName: "div"
  // }
 */
function render(vdom, container) {
  if (typeof(vdom) === 'string') {
    container.innerText = vdom
    return
  }
  const dom = document.createElement(vdom.nodeName)
  for (let attr in vdom.attributes) {
    setAttribute(dom, attr, vdom.attributes[attr])
  }
  vdom.children.forEach(vdomChild => render(vdomChild, dom))
  container.appendChild(dom)
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
    const eventName = attr.toLowerCase().splice(1)
    dom.addEventListener(eventName, value)
  } else if (attr === 'style') {    // 处理样式的属性:
    let styleStr = ''
    let standardCss
    for (let klass in value) {
      standardCss = humpToStandard(klass)
      styleStr += `${standardCss}: ${value[klass]};`
    }
    dom.setAttribute(attr, styleStr)
  } else {                          // 其它属性
    dom.setAttribute(attr, value)
  }
}

const element = (
  <div style={{ color: 'green', fontSize: '25px' }}>
    hello
  </div>
)

ReactDOM.render(
  element, // 上文的 element，即虚拟 dom
  document.getElementById('root')
)