import cpreact, { Component, ReactDOM, PureComponent } from '../src/index'

class B extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    const state = Object.assign({}, this.state)

    this.setState({
      count: ++this.state.count,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click}>增加</button>
        <div>{this.state.count}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)