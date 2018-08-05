import createElement from './createElement'
import Component from './component'
import { render } from './render'

const cpreact = {
  createElement,
}

const ReactDOM = {
  render(vdom, container) {
    container.innerHTML = null // 在热更新之前清空之前的 dom 元素
    render(vdom, container)
  }
}

export default cpreact
export { Component, ReactDOM, createElement }