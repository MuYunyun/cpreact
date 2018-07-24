import * as _ from 'diana'
import { humpToStandard } from './util'
import createElement from './createElement'
import Component from './component'
import { render } from './render'

const React = {
  createElement,
  Component,
}

const ReactDOM = {
  render(vdom, container) {
    container.innerHTML = null // 在热更新之前清空之前的 dom 元素
    render(vdom, container)
  }
}

// class A extends Component {
//   componentWillReceiveProps(props) {
//     console.log('componentWillReceiveProps')
//   }

//   componentDidMount() {
//     console.log('componentDidMountA')
//   }

//   render() {
//     return (
//       <div>{this.props.count}</div>
//     )
//   }
// }

// class B extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       count: 1
//     }
//   }

//   componentWillMount() {
//     console.log('componentWillMount')
//   }

//   componentDidMount() {
//     console.log('componentDidMount')
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('shouldComponentUpdate', nextProps, nextState)
//     return true
//   }

//   componentWillUpdate() {
//     console.log('componentWillUpdate')
//   }

//   componentDidUpdate() {
//     console.log('componentDidUpdate')
//   }

//   click() {
//     this.setState({
//       count: ++this.state.count
//     })
//   }

//   render() {
//     console.log('render')
//     return (
//       <div>
//         <button onClick={this.click.bind(this)}>Click Me!</button>
//         <A count={this.state.count} />
//       </div>
//     )
//   }
// }

class B extends Component {
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
      <div key={2}>
        <button key={0} onClick={this.click.bind(this)}>Click Me!</button>
        <div key={1}>{this.state.count}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)