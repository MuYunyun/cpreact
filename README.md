<div align="center">
  <img src="http://oqhtscus0.bkt.clouddn.com/9c461a61924ed0fecb6024a256671251.jpg-200">
</div>

A mini react-like wheel.

### Install

```
yarn add cpreact
```

### Demo Drive

<details>
  <summary>components</summary>

```js
class A extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <div>{this.props.name}:{this.state.count}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <A name="count" />,
  document.getElementById('root')
)
```
</details>

<details>
  <summary>life cycle</summary>

```js
class A extends Component {
  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps')
  }

  render() {
    return (
      <div>{this.props.count}</div>
    )
  }
}

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
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <A count={this.state.count} />
      </div>
    )
  }
}

ReactDOM.render(
  <B />,
  document.getElementById('root')
)
```
</details>

<details>
  <summary>setState</summary>

```js
export default class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    for (let i = 0; i < 10; i++) {
      this.setState({ // 在先前的逻辑中，没调用一次 setState 就会 render 一次
        count: ++this.state.count
      })
    }
  }

  render() {
    console.log(this.state.count)
    return (
      <div>
        <button onClick={this.click}>增加</button>
        <div>{this.state.count}</div>
      </div>
    )
  }
}
```
</details>

<details>
<summary>ref</summary>

```js
class A extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return <div>{this.state.count}</div>
  }
}

class B extends Component {
  constructor() {
    super()
    this.click = this.click.bind(this)
  }

  click() {
    this.A.click()
  }

  render() {
    return (
      <div>
        <button onClick={this.click}>加1</button>
        <A ref={(e) => { this.A = e }} />
      </div>
    )
  }
}
```
</details>

<details>
<summary>PureComponent</summary>

```js
class B extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    const state = Object.assign({}, this.state)

    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click}>增加</button>
        <div>{this.state.count}</div>
      </div>
    )
  }
}
```
</details>

### How to realize a react from 0 to 1

- [x] [前置准备](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/0.前置准备.md)
- [x] [JSX 和 Virtual DOM](https://github.com/MuYunyun/blog/issues/24)
- [x] [组件和 state|props](https://github.com/MuYunyun/blog/issues/25)
- [x] [生命周期](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/3.生命周期.md)
- [x] [diff 算法](https://github.com/MuYunyun/blog/issues/26)
- [x] [setState 优化](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/5.setState.md)
- [x] [ref 的实现](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/6.ref.md)
- [ ] [pureComponent](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/7.PureComponent.md)
- [ ] hoc
- [ ] 测试之旅，跑 preact 的测试用例 ing

### contribution

[how to pr](https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md)

### thanks

Especially thank [simple-react](https://github.com/hujiulong/simple-react) for the guidance function of this library

At the meantime，respect for [preact](https://github.com/developit/preact) and [react](https://github.com/facebook/react)