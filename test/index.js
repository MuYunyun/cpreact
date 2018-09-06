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
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    console.log('111', e)
  }

  render() {
    return (
      <input onChange={this.onChange} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)