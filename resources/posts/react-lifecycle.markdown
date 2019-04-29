---
title:  "React Component Lifecycle"
date:   2016-11-30 15:18:22 +0800
categories: web react
---

### Lifecycle

React 组件生命周期中涉及的方法比较多，每个方法在不同的阶段被调用。当初始化组件、`props`&`state`值更新和组件从DOM中被移除时就会触发这些方法的调用。

<figure>
  <img src="/images/post/react_lifecycle.svg" alt="containing block" />
  <figcaption>React Component Lifecycle</figcaption>
</figure>



### API

#### render()

纯粹的渲染。

> 不能调用`this.setState()`方法来更新`state`。

#### object getInitialState()

组件初始化前调用一次，用来初始化`this.state`对象。形同于构造函数，如果通过ES2015+面向对象语法使用，则需在`constructor()`构造函数中设置`this.state`对象。

> 此处不能引用`this.state`对象，也不能使用`this.setState()`方法来更新`this.state`对象。


#### object getDefaultProps()

设置默认`props`值。仅当组件初始化前调用一次。

> 此处不能引用`this.state`对象，也不能使用`this.setState()`方法来更新`this.state`对象。

#### componentWillMount()

首次`render()`之前调用，且仅会被调用这一次。


#### componentDidMount()

首次`render()` 完成之后立刻调用一次（仅一次），此时DOM已经生成。


#### componentWillReceiveProps(object nextProps)

接收到新的`props`时调用。一般通过比较新旧`props`，然后变更`state`来间接调用`render()`。

#### boolean shouldComponentUpdate(object nextProps, object nextState)

接收到新的`props` 或 `state` 时调用，其返回值决定是否执行后续`render()`方法。

> 不能使用`this.setState()`方法来更新`this.state`对象。


#### componentWillUpdate(object nextProps, object nextState)

接收到新的props 或 state 时调用。

> 不能使用`this.setState()`方法来更新`this.state`对象。

#### componentDidUpdate(object prevProps, object prevProps)

组件执行`render()`之后（非第一次）立刻被调用。

> 不能使用`this.setState()`方法来更新`this.state`对象。

#### componentWillUnmount()

组件从DOM中移除的时候被调用。


### References

- [React.Component](https://facebook.github.io/react/docs/react-component.html)
