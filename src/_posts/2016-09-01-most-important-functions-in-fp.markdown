---
layout: post
title:  "JavaScript函数式编程几个关键方法实现"
date:   2016-09-01 16:31:02 +0800
categories: functional
---


JavaScript函数式编程风格中，`map`、`filter`、`reduce`、`curry`、`compose`是使用极其高频的几个函数。本文简单针对这几个函数进行了简单实现。

首先，先定义一个`fp`(functional programming)对象:

```js
const fp = {}
```

`map(fn, list)` creates a new array with the results of calling a provided function on every element in this array.

```js
fp.map = function(fn, list) {
  const len = list.length
  const mapped = []
  for (var idx = 0; idx < len; idx++) {
    mapped.push(fn.call(null, list[idx]))
  }
  return mapped
}
```

`filter(fn, list)` creates a new array with all elements that pass the test implemented by the provided function.

这个和`map(fn, list)`函数类似，可以通过调用该函数间接实现。


```js
fp.filter = function(fn, list) {
  const filtered = []
  this.map(function(e){
    if (fn(e)) {
      filtered.push(e)
    }
  }, list)
  return filtered
}
```

`reduce(fn, list)` applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.


```js
fp.reduce = function(iterator, items) {

}
```

`curry(fn)` allows you to easily create higher order functions by partially invoking an existing function, without supplying all the arguments of the original function.

如何理解Curry化函数呢？

这里我们假设，`JavaScript`语法有这样的限制：**一个函数当且仅当只能容许拥有一个参数**。

那么，求两个数最大值`max(a, b)`函数该怎么实现呢？

没有函数参数只能有一个的限制时，可以这样实现：

```js
function max(a, b) {
  return a > b ? a : b;
}
max(10086, 10010)
// => 10086
```

但现在函数参数只能容许一个，可以将之前两个参数改成调用两个函数来解决：

```js
function curriedMax(a) {
  return function(b) {
    return a > b ? a : b;
  }
}
curriedMax(10086)(10010);
// => 10086
```

这里作出了这样的变换：
<p>
<center><code>fn(获取两个数最大值的函数)</code> => <code>fn(一个数与`10086`比较,获取最大的那个值)</code></center>
</p>

Curry化的过程就是消化一个参数，然后生成一个新的函数，剩余的参数作为新函数的参数。

注意，这里有个假设：函数只能有一个参数；因此，如果存在多个参数，则Curry化工作会一直继续下去直到最后一个参数。

函数的Curry化实现不可能像`curriedMax()`方法那样手动维护，一般会借助`curry(fn)`方法来实现。

采用递归的实现方式如下：

```js
fp.curry = function(fn) {
  const len = fn.length
  const that = this

  return function() {
    return (function(args) {
      if (args.length === len) {
        return fn.apply(that, args)
      }
      const callee = arguments.callee
      return function() {
        args.push(arguments[0])
        return callee(args)
      }
    })([arguments[0]])
  }

}

```

再回到刚才的`max(a, b)`函数，如果想对其Curry化：

```js
const curriedMax = fp.curry(max)
curriedMax(10086)(10010)
// => 10086
```
> Curry的好处&用途，本文尚不深入分析。

`compose(fns)` facilitates multiple function composition. This is the generation of a higher order function by combining simpler functions.



```js
// fp.compose(f,g,h) => f(g(h()))
fp.compose = function() {
  const fns = Array.prototype.slice.call(arguments).reverse()
  return this.reduce(function(preFn, curFn) {
    return function() {
      return curFn(preFn.apply(null, arguments))
    }
  }, fns)
}
```


