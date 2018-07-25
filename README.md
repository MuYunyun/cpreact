<div align="center">
  <img src="http://oqhtscus0.bkt.clouddn.com/9c461a61924ed0fecb6024a256671251.jpg-200">
</div>

a lightweight framework copy react

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

### documents

本系列文章帮助大家捋顺 React 框架的主干内容(JSX/虚拟DOM/组件/生命周期/diff/...)

- [x] [前置准备](https://github.com/MuYunyun/blog/blob/master/BasicSkill/从0到1实现React/0.前置准备.md)
- [x] [JSX 和 Virtual DOM](https://github.com/MuYunyun/blog/issues/24)
- [x] [组件和 state|props](https://github.com/MuYunyun/blog/issues/25)
- [x] [生命周期](https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/3.生命周期.md)
- [ ] diff

### How to pr

步骤一：启动项目，命令如下：

```babel
npm install -g parcel-bundler

npm run start
```

步骤二：可以在 [test/index.js](https://github.com/MuYunyun/cpreact/blob/master/test/index.js) 修改测试用例进行调试，如果有报错可以将测试用例和报错内容写到 issue 中