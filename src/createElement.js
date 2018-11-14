/**
 * 将 JSX 转化为 虚拟 DOM
 * @param {*} tag 标签类型
 * @param {*} attr 属性
 * @param {*} child 子属性
 * {
     attributes: {className: "title"}
     children: ["hello", t] // t 和外层对象相同
     key: undefined
     nodeName: "div"        // 如果是自定义组件则变为 nodeName: ƒ A()
   }
 */
function createElement(tag, attr, ...child) {
  let key = undefined
  if (attr && (attr.key || attr.key === 0)) {
    key = attr.key
  }
  return {
    attributes: attr == null ? undefined : attr,
    children: child,
    key,
    nodeName: tag,
  }
}

export default createElement