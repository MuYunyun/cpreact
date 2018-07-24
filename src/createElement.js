/**
 * 将 JSX 转化为 虚拟 DOM
 * @param {*} tag 标签类型
 * @param {*} attr 属性
 * @param {*} child 子属性
 * const title = <h1 className="title" key="tag">Hello, world!</h1> =>
 * {
    attributes: {className: "title", key="tag"}
    children: ["Hello, world!"]
    key: "tag"
    nodeName: "h1"
  }
 */
function createElement(tag, attr, ...child) {
  let key = undefined
  if (attr && (attr.key || attr.key === 0)) {
    key = attr.key
  }
  return {
    attributes: attr,
    children: child,
    key,
    nodeName: tag,
  }
}

export default createElement