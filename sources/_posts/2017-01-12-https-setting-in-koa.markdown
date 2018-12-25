---
layout: post
title:  "SSL/TLS"
date:   2017-01-12 15:18:22 +0800
categories: web, ssl
---

> SSL的全称Secure Sockets Layer，即安全通訊端層，簡而言之，這是一種標準的技術，用於保持網際網路連線安全以及防止在兩個系統之間發送的所有敏感資料被罪犯讀取及修改任何傳輸的資訊，包括潛在的個人詳細資料。
TLS即Transport Layer Security

Koa中设置 https


```js
const fs = require('fs')
const Koa = require('koa')
const https = require('https')
const enforceHttps = require('koa-sslify')

const options = {
    key: fs.readFileSync('./ssl/xxxx.key'),
    cert: fs.readFileSync('./ssl/xxxx.pem')
}

https.createServer(options, app.callback()).listen(config.port)
```
