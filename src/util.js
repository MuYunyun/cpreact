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
  return Promise.resolve().then(() => fn())
}