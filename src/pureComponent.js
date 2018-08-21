import * as _ from 'diana'
import { renderComponent } from './render'
import { defer, shallowEqual } from './util'

function PureComponent(props) {
  this.props = props
  this.state = this.state || {}
}

// update the state of component and rerender
PureComponent.prototype.setState = function(updater, cb) {
  const cpState = this.state
  this.shouldComponentUpdate = function(nextProps, nextState) {
    if (!shallowEqual(cpState, nextState)) {
      return true  // 浅比较不等的话，渲染
    } else {
      return false // 浅比较相等的话，不渲染
    }
  }
  asyncRender(updater, this, cb)
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
