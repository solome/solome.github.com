---
layout: post
title:  "前端異步編程小結"
date:   2016-12-16 15:18:22 +0800
categories: web
---

### Callback Functions

函數式編程中有個概念叫做高階函數(Higher-order Functions)，其有個特性是一個函數可以作為另外一個函數的參數。通常我們將那個作為另外一個函數參數的函數稱呼為回調函數。


```js
function getUserInfot(id, callback) {
  $.ajax({
    url: `**/api/v1.0/user/${id}`,
    success: data => callback(null, data),
    error: (xhr, textStatus, errorThrown) => callback(new Error(textStatus), errorThrown),
  })
}
```


### Promises/A+ Standard

```js

```

### Event Emitters

### generators

### RxJS

### References

- [promisejs.org](https://www.promisejs.org/)
