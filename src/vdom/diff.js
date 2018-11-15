import { isNumber, isString, isFunction, isArray } from 'diana'
import { vdomToDom, setAttribute, setProps, renderComponent } from '../render'

/**
 * 比较旧的 dom 节点和新的 virtual dom 节点：
 * @param {*} oldDom  旧的 dom 节点
 * @param {*} newVdom 新的 virtual dom 节点
 * @returns {*} newDom
 */
function diff(oldDom, newVdom) {
  if (oldDom === null) {
    return newVdom
  }

  if (isNumber(newVdom)) {
    newVdom = newVdom.toString() // 将数字转为字符串统一比较
  }

  if (isString(newVdom)) {            // 如果是文本
    return diffTextDom(oldDom, newVdom)
  }

  if (isFunction(newVdom.nodeName)) { // 如果是自定义组件
    return diffComponent(oldDom, newVdom)
  }

  if (oldDom.nodeName.toLowerCase() !== newVdom.nodeName) { // 对比非文本节点
    diffNotTextDom(oldDom, newVdom)
  }

  diffAttribute(oldDom, newVdom)

  if (newVdom.children.length > 0) {
    diffChild(oldDom, newVdom)
  }

  return oldDom // return new oldDom
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
  if (oldDom._component && (oldDom._component.constructor !== newVdom.nodeName)) { // 如果新老组件名不同，则直接用新组件替换老组件
    const newDom = vdomToDom(newVdom)
    oldDom.parentNode.insertBefore(newDom, oldDom)
    if (oldDom._component.componentWillUnmount) { oldDom._component.componentWillUnmount() }
    oldDom.parentNode.removeChild(oldDom)
    return newDom
  } else { // 如果组件名相同则替换 props 后
    setProps(oldDom._component, newVdom.attributes) // 将新的 attributes 值赋值给旧的
    renderComponent(oldDom._component)
    return oldDom
  }
}

/**
 * 对比非文本节点
 * @param {*} oldDom
 * @param {*} newVdom
 */
function diffNotTextDom(oldDom, newVdom) {
  let newDom
  if (newDom.nodeName === 'svg' || newDom.isSVGElement) { // 这一段代码没经过测试用例跑过, 见 https://github.com/MuYunyun/cpreact/issues/7
    dom = document.createElementNS('http://www.w3.org/2000/svg', newDom.nodeName)
    for (let i = 0; i < newDom.children.length; i++) {
      newDom.children[i].isSVGElement = true
    }
  } else {
    newDom = document.createElement(newVdom.nodeName)
  }
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
    if (oldObj.hasOwnProperty(attr) && oldObj[attr] !== newVdom.attributes[attr].toString()) {
      if (attr === 'value') { oldDom.value = newVdom.attributes[attr] } // 受控组件里调整值的关键语句
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
 * 对比子节点，新一轮计划开启。
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

  let newChildNodes = newVdom.children
  if (isArray(newVdom.children[0])) { // https://github.com/MuYunyun/cpreact/issues/9
    newChildNodes = newVdom.children[0]
  }

  for (let i = 0; i < newChildNodes.length; i++) {
    let child = null
    if (newChildNodes[i] && keyed[newChildNodes[i].key]) {
      child = keyed[newChildNodes[i].key]
      keyed[newChildNodes[i].key] = undefined
    } else { // 对应上面不存在 key 的情形
      // 在新老节点相同位置上寻找相同类型的节点进行比较；如果不满足上述条件则直接将新节点插入；
      if (children[i] && isSameNodeType(children[i], newChildNodes[i])) {
        child = children[i]
        children[i] = undefined
      } else if (children[i] && !isSameNodeType(children[i], newChildNodes[i])) { // 不是相同类型，直接替代掉
        if (newChildNodes[i] === null) {
          children[i].replaceWith('')
        }
        if (newChildNodes[i] && newChildNodes[i].nodeName) { // 后期虚拟 dom 考虑用类代替工厂模式，从而进行稳妥的比较
          children[i].replaceWith(vdomToDom(newChildNodes[i]))
        }
        children[i].replaceWith(newChildNodes[i])
        continue
      }
    }

    const result = diff(child, newChildNodes[i])
    // 如果 child 为 null
    if (result === newChildNodes[i]) {
      oldDom.appendChild(vdomToDom(result))
    }
  }
}

/**
 * 判断 dom 与 vdom 的节点类型是否相同
 * @param {*} dom
 * @param {*} vdom
 */
function isSameNodeType(dom, vdom) {
  if (vdom === null) { return false }
  if ((isNumber(vdom) || isString(vdom))) { // 判断是否为文本类型
    return dom.nodeType === 3
  }
  if (dom.nodeName.toLowerCase() === vdom.nodeName) { // 判断非文本类型的 dom
    return true
  }
  if (isFunction(vdom.nodeName)) { // 判断组件类型是否相同
    return dom._component && dom._component.constructor === vdom.nodeName
  }
  return false
}

export { diff }