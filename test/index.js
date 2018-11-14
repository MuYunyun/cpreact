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
let idx = 0
let msgs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
class Comp extends Component {
  componentWillMount() {
    this.innerMsg = msgs[(idx++ % 8)]
  }
  render() {
    return <div>{this.innerMsg}</div>
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state.alt = false
  }

  render() {
    const { alt } = this.state
    return (
      <div>
        {alt ? null : (<Comp key={1} alt={alt} />)}
        {alt ? null : (<Comp key={2} alt={alt} />)}
        {alt ? (<Comp key={3} alt={alt} />) : null}
      </div>
    )
  }
}

ReactDOM.render(
  <App ref={c => global.good = c} />,
  document.getElementById('root')
)
