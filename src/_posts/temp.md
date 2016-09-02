---
layout: post
title:  "JavaScript函数式编程几个关键方法实现"
date:   2016-09-01 16:31:02 +0800
categories: functional
---

JavaScript函数式编程风格中，`map`、`filter`、`reduce`、`curry`、`compose`是及其高频的几个函数。

```js
const fp = {}
```


```js
fp.map = function(iterator, items) {
  const len = items.length
  const mapped = Array(len)
  for (let idx = 0; idx < len; ++idx) {
    mapped.push(iterator.call(null, items[idx]))
  }

  return mapped
}
```

```js
fp.filter = function(iterator, items) {
  
}
```

```js
fp.reduce = function(iterator, items) {

}
```

```js
fp.curry = function(func) {

}
```
fp.compose = function() {

}



