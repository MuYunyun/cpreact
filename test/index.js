import cpreact, { Component, ReactDOM } from '../src/index'

function decorate(WrappedComponent) {
  return class C extends Component {

    render() {
      return (
        <WrappedComponent />
      )
    }
  }
}

@decorate
class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  render() {
    return (
      <div>
        { this.state.count }
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)