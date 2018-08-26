import cpreact, { Component, ReactDOM } from '../src/index'

// 测试 hoc
// function ppDecorate(WrappedComponent) {
//   return class extends Component {
//     constructor() {
//       super()
//       this.state = {
//         value: ''
//       }
//       this.onChange = this.onChange.bind(this)
//     }

//     onChange(e) {
//       this.setState({
//         value: e.target.value
//       })
//     }

//     render() {
//       const obj = {
//         onChange: this.onChange,
//         value: this.state.value,
//       }

//       return (
//         <WrappedComponent { ...this.props } { ...obj } />
//       )
//     }
//   }
// }

// @ppDecorate
// class B extends Component {

//   render() {
//     return (
//       <div>
//         <input { ...this.props } />
//         <div>{ this.props.value }</div>
//       </div>
//     )
//   }
// }

// ------------- 测试事件 --------------
// class B extends Component {
//   constructor() {
//     super()
//     this.onChange = this.onChange.bind(this)
//   }

//   onChange(e) {
//     console.log(e)
//   }

//   render() {
//     return (
//       <div>
//         <input onChange={this.onChange} />
//       </div>
//     )
//   }
// }

// 测试是否需要 forceUpdate
class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: {
        value: 1
      }
    }
  }

  shouldComponentUpdate() {
    return false
  }

  click() {
    console.log('111', this.state.count.value)
    this.state.count.value = ++this.state.count.value
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <div>{this.state.count.value}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)