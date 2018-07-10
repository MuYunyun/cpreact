import render from './render'

function Component(props) {
  this.props = props
  this.state = this.state || {}
}

// 更新组件状态并重新渲染
Component.prototype.setState = function(updateObj) {
  this.state = Object.assign({}, this.state, updateObj)
  const returnVdom = this.render() // 重新渲染

  document.getElementById('root').innerHTML = null
  render(returnVdom, document.getElementById('root')) // 暂时先这样处理，渲染全部
}

export default Component
