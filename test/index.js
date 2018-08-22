import cpreact, { Component, ReactDOM, PureComponent } from '../src/index'

class A extends PureComponent {
  render() {
    return (
      <div>{this.props.count.number}</div>
    )
  }
}

class B extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: { number: 1 }
    }
  }

  click() {
    this.setState({
      count: { number: 1 }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <A count={ this.state.count } />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)