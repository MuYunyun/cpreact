import { React, ReactDOM } from '../src/index'

class A extends React.Component {
  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps')
  }

  componentDidMount() {
    console.log('componentDidMountA')
  }

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
      count: 1
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    console.log('render')
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