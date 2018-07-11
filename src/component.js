import { _render } from './render'

function Component(props) {
  this.props = props
  this.state = this.state || {}
}

// 更新组件状态并重新渲染
Component.prototype.setState = function(updateObj) {
  this.state = Object.assign({}, this.state, updateObj)
  _render(this) // 重新渲染
}

export default Component
