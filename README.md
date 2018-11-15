<div align="center">
  <img src="http://oqhtscus0.bkt.clouddn.com/9c461a61924ed0fecb6024a256671251.jpg-200">
</div>

[![npm version](https://badge.fury.io/js/cpreact.svg)](https://badge.fury.io/js/cpreact) ![LICENSE MIT](https://img.shields.io/npm/l/cpreact.svg)

### Phisolophy

* 复现 React 的轴心
* 支持现代浏览器

### Implement React from 0 to 1

* [0.前置准备](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/0.前置准备.md)
* [1.JSX 和 Virtual DOM](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/1.JSX和虚拟DOM.md)
* [2.组件 和 state|props](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/2.组件和state|props.md)
* [3.生命周期](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/3.生命周期.md)
* [4.diff 算法](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/4.diff算法.md)
* [5.setState 优化](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/5.setState.md)
* [6.ref 实现](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/6.ref.md)
* [7.PureComponent 的实现](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/7.PureComponent.md)
* [8.HOC 探索](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/8.HOC探索.md)
* [9.onChange 事件以及受控组件](https://github.com/MuYunyun/blog/blob/master/从0到1实现React/9.onChange事件以及受控组件.md)

- [ ] 性能测试
- [ ] [沙盒](https://codesandbox.io/s/0xk1r2zmk0)中使用

> [更新日志](https://github.com/MuYunyun/cpreact/blob/master/CHANGELOG.md)

### Usage

```js
yarn install
yarn start
```

执行完上述命令后，会自动在浏览器 `localhost:8080` 上展示 `hello,cpreact`。

![](http://oqhtscus0.bkt.clouddn.com/4b7cca0d7176545b5556b54c77200595.jpg-200)

### Practice

* [踩坑日志](https://github.com/MuYunyun/cpreact/issues?utf8=✓&q=label%3A"踩坑日志")
* [小贴士](https://github.com/MuYunyun/cpreact/issues?utf8=✓&q=label%3A"tip")
* [常见的测试用例](https://github.com/MuYunyun/cpreact/issues/5)
* [性能优化实践之 —— 使用 why-did-you-update](https://github.com/demos-platform/why-did-you-update)

### Test Travel

以 preact 的测试用例为干线进行 TDD, 进度如下:

```js
yarn test
```

- [x] exports
- [x] createElement
- [ ] components
- [ ] keys
- [ ] lifecycle

### Contribution

Welcome to contrubute this proj, you can read [how to pr](https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md).

### Thanks

Especially thank [simple-react](https://github.com/hujiulong/simple-react)、[preact](https://github.com/developit/preact)、[react](https://github.com/facebook/react) for the guidance function of this library.
