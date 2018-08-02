import { React, ReactDOM } from '../src/index'

class A extends React.Component {
  render() {
    return (
      <div>{this.props.count}</div>
    )
  }
}

class B extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    for (let i = 0; i < 10; i++) {
      this.setState((prevState, props) => {
        count: prevState.count++
      })
    }
  }

  render() {
    console.log('render')
    return (
      <div>
        <button onClick={this.click}>Click Me!</button>
        <A count={this.state.count} />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)