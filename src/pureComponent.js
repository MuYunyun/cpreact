import * as _ from 'diana'
import { renderComponent } from './render'
import { defer, shallowEqual } from './util'

function PureComponent(props) {
  this.props = props || {}
  this.state = {}

  isShouldComponentUpdate.call(this) // 为每个 PureComponent 绑定 shouldComponentUpdate 方法
}

// update the state of component and rerender
PureComponent.prototype.setState = function(updater, cb) {
  isShouldComponentUpdate.call(this) // 调用 setState 时，让 this 指向子类的实例，目的取到子类的 this.state
  asyncRender(updater, this, cb)
}

function isShouldComponentUpdate() {
  const cpState = this.state
  const cpProps = this.props
  this.shouldComponentUpdate = function (nextProps, nextState) {
    if (!shallowEqual(cpState, nextState) || !shallowEqual(cpProps, nextProps)) {
      return true  // 只要 state 或 props 浅比较不等的话，就进行渲染
    } else {
      return false // 浅比较相等的话，不渲染
    }
  }
}

// 以下代码同 component.js
let componentArr = []

/**
 * async render
 * @param {*} updater
 * @param {*} component
 * @param {*} cb
 */
function asyncRender(updater, component, cb) {
  if (componentArr.length === 0) {
    defer(() => render())
  }

  if (cb) defer(cb)
  if (_.isFunction(updater)) {
    updater = updater(component.state, component.props)
  }
  component.state = Object.assign({}, component.state, updater)
  if (componentArr.includes(component)) {
    component.state = Object.assign({}, component.state, updater)
  } else {
    componentArr.push(component)
  }
}

function render() {
  let component
  while (component = componentArr.shift()) {
    renderComponent(component) // rerender
  }
}

export default PureComponent
