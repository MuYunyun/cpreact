<div align="center">
  <img src="http://oqhtscus0.bkt.clouddn.com/9c461a61924ed0fecb6024a256671251.jpg-200">
</div>

[![npm version](https://badge.fury.io/js/cpreact.svg)](https://badge.fury.io/js/cpreact) ![LICENSE MIT](https://img.shields.io/npm/l/cpreact.svg)

### 从 0 到 1 实现 React 系列

* [JSX 和 Virtual DOM](https://github.com/MuYunyun/blog/issues/24)
* [组件和 state|props](https://github.com/MuYunyun/blog/issues/25)
* [生命周期和 diff 算法](https://github.com/MuYunyun/blog/issues/26)
* [优化 setState 和 ref 的实现](https://github.com/MuYunyun/blog/issues/27)
* [PureComponent 实现 && HOC 探幽](https://github.com/MuYunyun/blog/issues/29)

> 与章节对应的代码可以在 [更新日志](https://github.com/MuYunyun/cpreact/blob/master/CHANGELOG.md) 下载。

> 该系列最新进度可以在 [blog](https://github.com/MuYunyun/blog#%E4%BB%8E-0-%E5%88%B0-1-%E5%AE%9E%E7%8E%B0-react) 中查看。

### Usage

```js
yarn install
yarn start
```

执行完上述命令后，浏览器会自动打开并在 `localhost:8080` 上展示 `hello,cpreact`。

![](http://oqhtscus0.bkt.clouddn.com/4b7cca0d7176545b5556b54c77200595.jpg-200)

### Useful Demos

在开发过程中，收集了一些有用的测试用例，罗列如下：

<details>
  <summary>components</summary>

```js
class App extends Component {
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
        <div>{this.state.count}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App name="count" />,
  document.getElementById('root')
)
```
</details>

<details>
  <summary>state && props</summary>

```js
// this case is to know the attr in the jsx `<A a={1} { ...obj } />` is converted to { a: 1, b: 2, c: 3 }

class A extends Component {
  render() {
    return (
      <div>{this.props.a + this.props.b + this.props.c}</div>
    )
  }
}

class B extends Component {
  render() {
    const obj = { b: 2, c: 3 }
    return (
      <div>
        <A a={1} { ...obj } />
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
class App extends Component {
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
// 测试用例：验证 state 浅比较
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

// 测试用例：验证 props 浅比较
class A extends PureComponent {
  render() {
    return (
      <div>{this.props.count.number}</div>
    )
  }
}

class B extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: { number: 1 }
    }
  }

  click() {
    this.setState({
      count: { number: 1 }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this)}>Click Me!</button>
        <A count={ this.state.count } />
      </div>
    )
  }
}
```
</details>

### Contribution

If you want to contrubute this proj, you can read [how to pr](https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md).

### Thanks

Especially thank [simple-react](https://github.com/hujiulong/simple-react) for the guidance function of this library. At the meantime，respect for [preact](https://github.com/developit/preact) and [react](https://github.com/facebook/react)
