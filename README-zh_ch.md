<div align="center">
  <img src="http://oqhtscus0.bkt.clouddn.com/9c461a61924ed0fecb6024a256671251.jpg-200">
</div>

cpreact is a lightweight react

### Usage

```
npm install cpreact
```

```js
import { React, ReactDom } from 'cpreact'

class Test extends React.Component {
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
  <Test />,
  document.getElementById('root')
)
```

### contribution

[how to pr](https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md)

### develop notebook

- [x] [前置准备](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/0.前置准备.md)
- [x] [JSX 和 Virtual DOM](https://github.com/MuYunyun/blog/issues/24)
- [x] [组件和 state|props](https://github.com/MuYunyun/blog/issues/25)
- [x] [生命周期](https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/3.生命周期.md)
- [x] [diff 算法](https://github.com/MuYunyun/blog/issues/26)
- [x] [setState](https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/5.setState.md)
- [ ] 测试之旅

### thanks

尤为感谢 [simple-react](https://github.com/hujiulong/simple-react) 对该库的指导作用

同时致敬 [preact](https://github.com/developit/preact)，[react](https://github.com/facebook/react)