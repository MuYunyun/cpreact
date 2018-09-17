import cpreact, { Component, ReactDOM } from '../src/index'

// You can try to run test demo in this file
// how to use ? you can read https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md
// class App extends Component {
//   render() {
//     return (
//       <div>hello, cpreact</div>
//     )
//   }
// }

class App extends Component {
  constructor() {
    super()
    this.state = { num: 123 }
    this.change = this.change.bind(this)
  }

  change(e) {
    console.log(e.target.value) // 会一直输出 123
    this.setState({
      num: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input value={this.state.num} onChange={this.change} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)