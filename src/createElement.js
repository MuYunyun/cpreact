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

export default createElement