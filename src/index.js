import * as _ from 'diana'
import createElement from './createElement'
import Component from './component'
import { render } from './render'

const React = {
  createElement,
  Component,
}

const ReactDOM = {
  render(vdom, container) {
    container.innerHTML = null // 在热更新之前清空之前的 dom 元素
    render(vdom, container)
  }
}

export { React, ReactDOM }