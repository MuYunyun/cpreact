import cpreact, { Component, ReactDOM } from '../src/index'

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
//       console.log('111', e)
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
//         <span>{ this.props.value }</span>
//       </div>
//     )
//   }
// }

class B extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    console.log(e)
  }

  render() {
    return (
      <div>
        <input onChange={this.onChange} />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)