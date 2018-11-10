# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Feat

* [支持 SVG](https://github.com/MuYunyun/cpreact/issues/7)

### Fix

* 修复 props 在组件间传递间丢失

## [0.5.3](https://github.com/MuYunyun/cpreact/tree/v0.5.3) 2018-10-17

### Fix

* 修复 diff 算法的 bug
* 修复使用 PureComponent 依然执行不必要的渲染
* 修复 [JSX 解析错误](https://github.com/MuYunyun/cpreact/issues/9)

## [0.5.2](https://github.com/MuYunyun/cpreact/tree/v0.5.2) 2018-9-18

### Feat

* 受控组件

## [0.5.0] 2018-9-15

### Feat

* 增加 [defaultProps](https://github.com/MuYunyun/cpreact/commit/242b7f29106ca947a5039ddbfa68036b0524a582#diff-855b05ea6fe92e5b91d6da40f15dae9fL33)

### Fix

* 修复 [htmlFor/disabled/autofocus](https://github.com/MuYunyun/cpreact/commit/43ebe0f5d800fce80a73e61ac2daa5c0b036fbda) 未生效

## [0.4.3] 2018-9-11

### Changed

* 用 input 事件同步 onChange 事件(与 React 同步)
* 使用 Webpack 替代 Parcel(parcel 热更新有 bug)
* 按需加载 diana，打包体积从 28 kb 缩小为 9 kb

## [0.4.1](https://github.com/MuYunyun/cpreact/tree/v0.4.1) 2018-8-27

### Feature

* do reasearch in HOC

## [0.4.0](https://github.com/MuYunyun/cpreact/tree/v0.4) 2018-8-5

### Feature

* 实现 refs
* 实现 PureComponent

### Changed

* SetState 修改为异步调用

## [0.3.0](https://github.com/MuYunyun/cpreact/tree/v0.3) 2018-7-27

### Feature

* 实现生命周期
* 实现 diff 算法

## [0.2.0](https://github.com/MuYunyun/cpreact/tree/v0.2) 2018-7-6

### Feature

* 实现 Components
* 实现 State 和 Props

## [0.1.0](https://github.com/MuYunyun/cpreact/tree/0.1) 2018-7-6

### Feature

* 实现 Virtual DOM