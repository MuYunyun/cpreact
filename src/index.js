import * as _ from 'diana'
import { humpToStandard } from './util'
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

class A extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <div>{this.props.name}:{this.state.count}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <A name="count" />,
  document.getElementById('root')
)