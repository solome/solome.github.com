# 从一个走台阶故事说起

## 递归

```js
function fibonacci(n) {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

## 尾递归

```js
function fibonacci(n, prev = 0, next = 1) {
  if (n === 0) {
    return prev
  }
  return fibonacci(n - 1, next, prev + next)
}
```

## 空间换时间

```js
const fibonacci = (function () {
  const cache = {}

  return function fib(n) {
    if (n in cache) return cache[n]
    return (cache[n] = n === 0 || n === 1 ? n : fib(n - 1) + fib(n - 2))
  }
})()
console.log(fibonacci(10))
```

```js
const fibonacci = (function () {
  const cache = {}

  return function fib(n, prev = 0, next = 1) {
    if (n in cache) return cache[n]
    return (cache[n] = n === 0 ? prev : fib(n - 1, next, prev + next))
  }
})()
console.log(fibonacci(10))
```

## 通项式

### 通项式推导方式一：数列思路

### 通项式推导方式一：矩阵思路

