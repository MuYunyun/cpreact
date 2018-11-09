import cpreact, { Component, ReactDOM, PureComponent } from '../src/index'

// You can try to run test demo in this file
// how to use ? you can read https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md
// class App extends Component {
//   render() {
//     return (
//       <div>hello, cpreact</div>
//     )
//   }
// }

class PassState extends Component {
  constructor() {
    super()
    this.state = { name: 'muyy' }
  }

  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

class UseState extends Component {
  render() {
    const { state } = this.props
    return (<div>
      {state.name}
    </div>)
  }
}

class App extends Component {
  render() {
    return (
      <PassState render={(state) => (
        <UseState state={state} />
      )} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
