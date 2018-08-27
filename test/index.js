import cpreact, { Component, ReactDOM } from '../src/index'

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

function iiHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      const parentRender = super.render()
      if (parentRender.nodeName === 'span') {
        return (
          <span>继承反转</span>
        )
      }
    }
  }
}

@iiHOC
class B extends Component {
  render() {
    return (
      <span>Inheritance Inversion</span>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)