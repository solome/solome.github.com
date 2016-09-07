---
layout: post
title:  "函数式编程之纯函数"
date:   2016-09-07 15:18:22 +0800
categories: functional
---

数学上的函数指的是两个集合间的一种特殊的映射关系。这个特殊体现在什么地方呢？

我们将集合A的元素称呼为输入值，集合B的元素称呼为输出值，集合A、B存在这样的映射关系：
每个输入值只会映射一个输出值，不同的输入值可以映射相同的输出值，不会出现同一个输入值映射不同的输出值。

下图集合A和集合B的映射关系即符合数学函数的定义。


满足这种数学意义上的函数即为纯函数(Pure Function)：相同的输入（参数），永远得到的是相同的输出（返回值），并且没有任何可观察的副作用。
与纯函数的概念相反的函数（即相同输入却得到不同结果 或 附带副作用）叫做非纯函数(Impure Function)。


### 关于函数副作用

函数副作用 指当调用函数时，在计算返回值数值的过程中，对主调用函数产生附加的影响。

比如变更了更高作用域的的变量：

```js
let glob = 1
function foo(x) { return ++glob + x }
console.log(foo(1)) // => 3
```

变量`glob`的值已发生变更，表现得很不明显。

“隐晦”地修改了引用参数：

```js
let glob = 1
const obj = {glob}
function foo(x) { return ++x.glob }
foo(obj)
console.log(glob) // => 2
```

虽然对象`obj`定义为`const`，但是修改了间接引用的变量`glob`；这种场景引发的bug其实是很难捕获的（尤其是具备指针概念的C/C++语言）。

函数副作用确实是滋生bug的温床，但并不意味着其一无是处；
也无需一昧追求纯函数编程，在实际编码中，我们根本无法避免函数的副作用（典型的例子是读写数据库操作的函数）。
最好的做法是，要将这些副作用限制在可控的范围内。

### 纯函数带来的好处

#### 函数调用结果可缓存

相同参数得到的返回值是相同的。
如果通过参数获取返回值的过程计算量过大，我们可以缓存函数调用的结果，避免相同参数为了获取返回值进行重复计算。
典型的实践是对递归函数做性能优化的memoize技术。

以`fibonacci(n)`递归函数为例，传统的实现：

```js
function fibonacci(n) {
  if (n === 0 || n === 1) return n
  return fibonacci(n-1) + fibonacci(n-2)
}

console.log(fibonacci(10))
```

计算的复杂度以参数`n`呈指数级增长：

```haskell
f(0) = 0
f(1) = 1
f(2) = f(1) + f(0) = 1
f(3) = f(2) + f(1) = 2
f(4) = f(3) + f(2)
     = f(2) + f(1) + f(2) = 3
f(5) = f(4) + f(3)
     = f(3) + f(2) + f(2) + f(1)
     = f(2) + f(1) + f(2) + f(2) + f(1) = 5
f(6) = f(5) + f(4)
     = f(4) + f(3) + f(3) + f(2)
     = f(3) + f(2) + f(2) + f(1) + f(2) + f(1) + f(2)
     = f(2) + f(1) + f(2) + f(2) + f(1) + f(2) + f(1) + f(2) = 8
... ...
```

为了获取`fibonacci(n)`的结果，我们不得不将`fibonacci(n-1)`和`fibonacci(n-2)`都得计算一遍；
如果我们在调用一次`fibonacci(n)`之后，就将其缓存起来，下次再调用时就无需重新再计算。
稍加改造，添加对计算结果的缓存：

```js
const fibonacci = (function() {
  const cache = {}

  return function fib(n) {
    if (n in cache) return cache[n]
    return (cache[n] = (n === 0 || n === 1) ? n : fib(n-1) + fib(n-2))
  }
})()
console.log(fibonacci(10))
```

这是典型的以空间换效率的实现方案，避免了额外计算的浪费。
这样实现的前提就是，该递归函数是纯函数，相同参数得到的返回值一定是相同的；如果不能保证相同，我们无法做缓存。

当然，我们可以实现一个`memoize()`函数来统一做缓存这样的工作。
JavaScript函数式编程支持库如均提供`memoize()`函数，这里提供一种不太健壮（内存溢出）的实现方案。

```js
function memoize(func) {
  const memo = {}
  const slice = Array.prototype.slice

  return function() {
    const args = slice.call(arguments)

    if (args in memo) return memo[args]
    return (memo[args] = func.apply(this, args))
  }
}
```

#### 便于移植、自文档化和测试

#### 引用透明

#### 并行代码

### 关于引用透明

