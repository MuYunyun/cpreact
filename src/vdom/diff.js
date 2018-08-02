import * as _ from 'diana'
import { vdomToDom, setAttribute, setProps, renderComponent } from '../render'

/**
 * 比较旧的 dom 节点和新的 virtual dom 节点：
 * @param {*} oldDom  旧的 dom 节点
 * @param {*} newVdom 新的 virtual dom 节点
 */
function diff(oldDom, newVdom) {
  if (_.isNumber(newVdom)) {
    newVdom = newVdom.toString()
  }

  if (_.isString(newVdom)) { // 如果是文本
    return diffTextDom(oldDom, newVdom)
  }

  if (_.isFunction(newVdom.nodeName)) { // 如果是自定义组件
    return diffComponent(oldDom, newVdom)
  }

  if (oldDom.nodeName.toLowerCase() !== newVdom.nodeName) {
    diffNotTextDom(oldDom, newVdom)
  }

  diffAttribute(oldDom, newVdom)

  if (newVdom.children.length > 0) {
    diffChild(oldDom, newVdom)
  }

  return oldDom
}

/**
 * 对比文本节点
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffTextDom(oldDom, newVdom) {
  let dom = oldDom
  if (oldDom && oldDom.nodeType === 3) { // 如果老节点是文本节点
    if (oldDom.textContent !== newVdom) {
      oldDom.textContent = newVdom
    }
  } else {
    dom = document.createTextNode(newVdom)
    if (oldDom && oldDom.parentNode) {
      oldDom.parentNode.replaceChild(dom, oldDom)
    }
  }
  return dom
}

/**
 * 对比自定义组件
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffComponent(oldDom, newVdom) {
  if (oldDom._component && (oldDom._component.constructor !== newVdom.nodeName)) { // 如果新老组件不同，则直接将新组件替换老组件
    const newDom = vdomToDom(newVdom)
    oldDom._component.parentNode.insertBefore(newDom, oldDom._component)
    oldDom._component.parentNode.removeChild(oldDom._component)
  } else { // 如果组件名相同则替换 props 后
    setProps(oldDom._component, newVdom.attributes) // 将新的 attributes 值赋值给旧的
    renderComponent(oldDom._component)
  }
}

/**
 * 对比非文本节点
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffNotTextDom(oldDom, newVdom) {
  const newDom = document.createElement(newVdom.nodeName);
  [...oldDom.childNodes].map(newDom.appendChild)
  if (oldDom && oldDom.parentNode) {
    oldDom.parentNode.replaceChild(oldDom, newDom)
  }
}

/**
 * 对比属性
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffAttribute(oldDom, newVdom) {
  const oldObj = {}
  for (let i = 0; i < oldDom.attributes.length; i++) { // NamedNodeMap 特殊形式
    oldObj[oldDom.attributes[i].name] = oldDom.attributes[i].value
  }

  for (const attr in newVdom.attributes) {
    if (oldObj[attr] && oldObj[attr] !== newVdom.attributes[attr].toString()) {
      setAttribute(oldDom, attr, newVdom.attributes[attr])
    }
  }

  for (const oldAttr in oldObj) { // 如果旧 dom 节点中有，新 dom 节点中没有
    if (!newVdom.attributes[oldAttr]) {
      setAttribute(oldDom, oldAttr, undefined)
    }
  }
}

/**
 * 对比子节点
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffChild(oldDom, newVdom) {
  const keyed = {}
  const children = []
  const oldChildNodes = oldDom.childNodes
  for (let i = 0; i < oldChildNodes.length; i++) {
    if (oldChildNodes[i].key) {
      keyed[oldChildNodes[i].key] = oldChildNodes[i]
    } else { // 如果不存在 key，则优先找到节点类型相同的元素
      children.push(oldChildNodes[i])
    }
  }

  const newChildNodes = newVdom.children
  let child
  for (let i = 0; i < newChildNodes.length; i++) {
    if (keyed[newChildNodes[i].key]) {
      child = keyed[newChildNodes[i].key]
      keyed[newChildNodes[i].key] = undefined
    } else { // 对应上面不存在 key 的情形
      for (let j = 0; j < children.length; j++) {
        if (isSameNodeType(children[i], newChildNodes[i])) {
          child = children[i]
          children[i] = undefined
          break
        }
      }
    }
    diff(child, newChildNodes[i])
    // child = diff(child, newChildNodes[i])
    // 更新
    // const f = oldChildNodes[i]
    // if (child && child !== oldDom) {
    //   if (!f) {
    //     oldDom.appendChild(child)
    //   }
    // }
  }
}

/**
 * 判断 dom 与 vdom 的节点类型是否相同
 * @param {*} dom
 * @param {*} vdom
 */
function isSameNodeType(dom, vdom) {
  if ((_.isNumber(vdom) || _.isString(vdom))) { // 判断是否为文本类型
    return dom.nodeType === 3
  }
  if (dom.nodeName.toLowerCase() === vdom.nodeName) { // 判断非文本类型的 dom
    return true
  }
  if (_.isFunction(vdom.nodeName)) { // 判断组件类型是否相同
    return dom._component.constructor === vdom.nodeName
  }
  return false
}

export { diff }