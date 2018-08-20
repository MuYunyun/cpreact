/**
 * 处理驼峰样式为标准样式
 * @param {*} klass 驼峰样式
 // fontSize => font-size
 */
export const humpToStandard = function (klass) {
  return klass.replace(/[A-Z]/, (match) => '-' + match.toLowerCase())
}

/**
 * call function with event loop
 * @param {*} fn
 */
export const defer = function(fn) {
  return Promise.resolve().then(function() {
    return fn()
  })
}

/**
 * 浅比较
 * @param {*} oldState
 * @param {*} nextState
 */
export const shallowEqual = function(oldState, nextState) {
  const oldKeys = Object.keys(oldState)
  const newKeys = Object.keys(nextState)

  if (oldKeys.length !== newKeys.length) {
    return false
  }

  let flag = true
  for (let i = 0; i < oldKeys.length; i++) {
    if (!nextState.hasOwnProperty(oldKeys[i])) {
      flag = false
      break
    }

    if (nextState[oldKeys[i]] !== oldState[oldKeys[i]]) {
      flag = false
      break
    }
  }

  return flag
}