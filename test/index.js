import cpreact, { Component, ReactDOM } from '../src/index'

class A extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return <div>{this.state.count}</div>
  }
}

class B extends Component {
  constructor() {
    super()
    this.click = this.click.bind(this)
  }

  click() {
    this.A.click()
  }

  render() {
    return (
      <div>
        <button onClick={this.click}>加1</button>
        <A ref={(e) => { this.A = e }} />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)