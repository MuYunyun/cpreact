# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fix

* 兼容 htmlFor 属性
* 修复 disabled/autofocus 未生效

## [0.4.3] 2018-9-11

### Changed

* 用 input 事件同步 onChange 事件(与 React 同步)
* 使用 Webpack 替代 Parcel(社区更广)
* 按需加载 diana，打包体积从 28 kb 缩小为 9 kb

## [0.4.1](https://github.com/MuYunyun/cpreact/releases/tag/v0.4.1) 2018-8-27

### Feature

* do reasearch in HOC

## [0.4.0](https://github.com/MuYunyun/cpreact/releases/tag/v0.4) 2018-8-5

### Feature

* 实现 refs
* 实现 PureComponent

### Changed

* SetState 修改为异步调用

## [0.3.0](https://github.com/MuYunyun/cpreact/releases/tag/v0.3) 2018-7-27

### Feature

* 实现生命周期
* 实现 diff 算法

## [0.2.0](https://github.com/MuYunyun/cpreact/releases/tag/v0.2) 2018-7-6

### Feature

* 实现 Components
* 实现 State 和 Props

## [0.1.0](https://github.com/MuYunyun/cpreact/releases/tag/0.1) 2018-7-6

### Feature

* 实现 Virtual DOM