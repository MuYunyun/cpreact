import cpreact, { Component, ReactDOM, PureComponent } from '../src/index'

class A extends PureComponent {
  componentWillReceiveProps(props) {
    console.log('componentWillReceivePropsA')
  }

  render() {
    return (
      <div>{this.props.count}</div>
    )
  }
}

class B extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  componentWillMount() {
    console.log('componentWillMountB')
  }

  componentDidMount() {
    console.log('componentDidMountB')
  }

  componentWillUpdate() {
    console.log('componentWillUpdateB')
  }

  componentDidUpdate() {
    console.log('componentDidUpdateB')
  }

  click() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    console.log('renderB')
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <A count={this.state.count} />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)