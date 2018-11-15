/**
 * You can run `npm start` to view the demo in the browser.
 */
import cpreact, { Component, ReactDOM } from '../src/index'

// class App extends Component {
//   render() {
//     return (
//       <div>hello, cpreact</div>
//     )
//   }
// }

window.doRender = null

class Outer extends Component {
  state = {
    i: 1
  }
  componentDidMount() {
    window.doRender = () => this.setState({ i: ++this.state.i })
  }
  componentWillUnmount() { }
  render() {
    const { i } = this.state
    // if (alt) return <div is-alt />
    return <Inner i={i} {...this.props} />
  }
}

let j = 0
class Inner extends Component {
  constructor(...args) {
    super()
    this._constructor(...args)
  }
  _constructor() { }
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  render() {
    return <div j={++j} {...this.props}>inner</div>
  }
}

ReactDOM.render(
  <Outer foo="bar" />,
  document.getElementById('root')
)
