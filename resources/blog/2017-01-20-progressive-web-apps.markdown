---
layout: post
title:  "Progressive Web Apps 初探"
date:   2017-02-20 15:18:22 +0800
categories: web
---

### Native Apps

最暴力的做法，纯粹地使用原生技术实现：同一套UI，iOS和Android端均利用自己风格的技术栈实现一遍；如果想支持移动端浏览器的话，还需要一个移动前端团队再实现一遍简版。面临的问题是：多团队，技术栈种类多；随便新增一个需求，牵扯的点太多了，毫无"灵活性"。

- "热更新"限制，用户并一定会主动升级自己的App

### Hybird Apps: Native + WebView + Bridge Protocol

这种模式整体思路是App主体框架还是由Native部分构建，但是多端适用、频繁迭代的页面则由WebView页面替代。Native与WebView部分"沟通"则可以定制一份"桥协议"( Bridge Protocol)。典型的开源实现有

- http://ionicframework.com/
- http://phonegap.com/
- http://code.kik.com/app/2/index.html
	
其实稍大些的互联网公司都会根据自己的业务特色自建一套属于自己的"桥协议"。

WebView中的JavaScript执行环境如何通知Native去执行某些行为？一般的做法通过JavaScript去发一个类HTTP请求（一个特殊的Schema，而非"http://"），然后Native会拦截这个特殊Schema请求，根据具体的路径或请求参数做出对应的反馈。

Native如何通过JavaScript执行某些行为？
- 修改当前WebView的Url，JavaScript监听Url变化。
- 直接修改当前WebView中HTML内容，硬塞一段JavaScript去执行。
	
### Cross Platform Framework

通过"桥协议"，WebView可以调用本身无法实现的功能如设备Wifi、蓝牙状态的控制等。WebView模式虽然部分解决重复开发的问题，但是开发一个App，依旧需要多个不同技术栈团队共同协助完成（全栈式的研发人员毕竟不多见）。
一个App的实现，要涉及iOS、Android、Web等各种前端领域的技术栈，不是每个研发团队都具备这样的开发资源。此外，WebView兼容性适配问题甚是恶习，尤其是针对国内五花八门的Android定制ROM。

能不能把"桥协议"走得更加"彻底"些呢？怎么才叫做走得更加"彻底"呢？彻底地抛弃掉WebView，将WebView上所有的View功能全部通过Native重新实现一遍，实现View层技术栈的跨平台。这种思路最典型的实现是React Native和Weex。正如其宣传的口号那样"Learn Once Write Anywhere 、Write Once Run Everywhere"，其本质是统一Apps开发View层技术栈而已。

- https://facebook.github.io/react-native/
- https://weex-project.io/

> 2019年回顾：感觉目前最正确的思路是，同一套开发方式（也可以仅View层）然后通过构建编译来适用于各类平台。核心点转移到构建、编译过程中，但开发体验是一致的。

### Progressive Web Apps

然后，在此处简单总结下Apps开发面临的问题：因为多端（iOS, Android及Web），UI和业务需求在不同端重复开发；又因为各端技术栈不尽相同，造成研发资源很"繁重"。这一切的根源都是"端"的差异性造成的，那能不能去掉这种差异性呢。

幸运的是，Web Apps就没有这样的困扰，她的载体是浏览器而非操作系统，不同浏览器的差异性远比操作系统（平台）的差异性要小得多。

但是与Native App开发相比，移动端Web App开发存在着一系列的困扰：
- 依赖网络条件，无法离线使用；
- 依赖浏览器，无法以全屏方式运行，不能添加到主屏幕；
- 无法做到系统级别的通知消息，页面内容难以被动更新。

那Google 推广的Progressive Web Apps又是个什么东西呢？ 官方文档介绍了一堆，其实用一句话来概括的话就是：“穷尽”当代可能的Web技术，“渐进式”地在性能和视觉上靠近出Native Apps，使Web Apps具备更加流畅的交互体验。

- “穷尽”：当代的Web技术或规范不能满足，Google就基于Android、Chromium两平台去创造推广新的技术或规范。
- “渐进式”：不行的环境就放它不行，行的环境要让它发挥出行的价值。强调的是开发理念而非一套固定的技术或规范。

#### Google 提供的方案

- Web App Manifest 规范：manifest.json
- 给Chromium 带来 Service Worker支持，解决浏览器缓存等问题
- App Shell（服务器渲染一个HTML模板，内容动态加载）
- 充分利用已有Web技术：性能优化、响应式等

Progressive Web Apps 目前面临的最大的问题是得不到iOS平台的支持。
可能对Apple而言，App Store 是一个大市场，而且还是个封闭的市场，如果Web Apps能完全取代Native Apps的化，这个大市场也意味着脱离了Apple的控制。

> 2018, iOS 11.3 貌似已经简单支持PWA的某些特性。

Web Apps不能取代Native Apps的核心原因是Web Apps不能调用系统级别的API；为了调用系统级别的API只能通过"桥协议"来间接调用，而这个"桥协议"的载体不是浏览器，需通过Naitve Apps来实现。

假如未来有这么样的一个标准（或规范），这些"桥协议"已经由浏览器来实现，是不是可以理解成每个互联网的Url就对应着一个App。或者未来的消费级别的操作系统就是个强大的浏览器，每个互联网的Url就对应着一个App，这个App的使用权限、 收费情况全部由消费者和开发者双方决定；这一切都与App Strore无关，那App Store会变成怎样，App Strore会沦为搜索引擎或广告服务商？。这点我深信不疑！
