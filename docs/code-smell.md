# 代码的坏味道

import {Sup} from '../src/components/Sup';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## “神秘命名（Mysterious Name）”

> There are only two hard things in Computer Science: cache invalidation and naming things.  
> ——Years ago, when my dad Phil Karlton was working at Netscape, he touted a now-infamous phrase[#naming-things-hard](https://www.karlton.org/2017/12/naming-things-hard/).

编码的第一步就是需要深思熟虑如何给函数、模块、变量和类命名，使它们能清晰地表明自己的功能和用法。

### 命名有效字符集合

**命名有效字符集合** 是 **大小写英文（a-zA-Z）**、**数字（0-9）**、 **下划线 "_"** 、 **<Sup remark={"即减号符，主要用于文件（含文件夹）命名，变量、类、结构体等源码中命名不适用。"}>横杆符 hypen "-"</Sup>**、**<Sup remark='英文读作 "Hash"，类私有成员鼓励添加 "#" 前缀，不建议写 private 关键字。'>井号符 "#"</Sup>** 和 **<Sup remark="仅限制于特定用途的文件名，比如测试文件 index.test.ts、Storybook 组件 ContextMenu.stories.tsx 这类。">点 "." 字符</Sup>**，不允许直接使用中文及其他字符。

### 文件

**<Sup remark="这里的文件夹指 ComponentName/index.js，类似于 ComponentName.js。一般 ComponentName 实现会比较复杂，会拆分出多个文件。">文件（含文件夹）</Sup>** 命名规则默认使用 连字符命名法——即由 纯小写英文字母（a-z） 、数字（0-9） 和 横杆符 hypen "-" 组成，且 横杆符 hypen "-" 不容许当作命名的首字符。

**文件名应该与其默认导出的内容名称在含义上保持一致**。需要注意的是，如果一个文件（或文件夹）导出是 组件 或 枚举、类等复杂数据结构的集合，命名规则依旧是 **连字符命名法**——最好抽象能体现这个函数集合用途的命名。

<Tabs>
  <TabItem value="1" label="反面例子 isMP3.js">
```js
export function isMP3(filename) {
  // ...
}

export function isMP4(filename) {
  // ...
}

export function isVideo(filename) {
  // ...
}
```
  </TabItem>
  <TabItem value="2" label="正面例子 file-type-analysis.js" default>
```js
// 文件名是 file-type-analysis.js 比较合适，因为导出多个函数，最好抽象能体现这个函数集合用途的命名。
export function isMP3(filename) {
  // ...
}

export function isMP4(filename) {
  // ...
}

export function isVideo(filename) {
  // ...
}
```
  </TabItem>
</Tabs>

以下场景需强制使用 驼峰命名法——即只能包含 英文大小写字母（A-Za-z）和 数字（0-9）。禁止首位字符出现数字。单词间没有分隔字符。每个单词的首字母采用大写字母。

❶ 结构体、枚举、类、函数等复杂数据结构定义（或声明），要求该文件默认抛出的复杂数据结构名与文件（或文件夹）同名。

<Tabs>
  <TabItem value="1" label="与导出结构体一致 HTTPCode.js">
```js
export default enum HTTPCode {
  Error = 500,
  NotFound = 404,
}
```
  </TabItem>
    <TabItem value="2" label="Class类 AudioLike.ts">
```js
export default class AudioLike {
  // 类的具体实现
}
```
  </TabItem>
    <TabItem value="3" label="单例 audioStoreSingleton.js" default>
```ts
export class AudioStore {
  // 类的具体实现
}

const audioStoreSingleton = new AudioStore()
// 文件命名与 export default 对象一致
export default audioStoreSingleton
```
  </TabItem>
    <TabItem value="4" label="函数 useDebounce.ts">
```ts
/**
 * @description Debounce hook, returns debounced value
 */
function useDebounce<T>(value: T, delay: number = 50) {
  // 函数具体实现
}
```
  </TabItem>

</Tabs>
❷ 单 React 或 Vue 组件文件（或文件夹），要求该文件默认抛出的组件名和文件（或文件夹）同名。

<Tabs>
  <TabItem value="1" label="反面例子 user-avatar.jsx">
```jsx
export default function UserAvatar(props) {
  return <div><img src={props.url} /></div>
}
```
  </TabItem>
    <TabItem value="2" label="正面例子 UserAvatar.jsx" dafault>
```jsx
// 文件名是 UserAvatar.jsx，与导出的组件名一致。
export default function UserAvatar(props) {
  return <div><img src={props.url} /></div>
}
```
  </TabItem>
</Tabs>
### 源码

**变量命名** 强制使用 **小驼峰命名法** 规则。

**常量命名（或宏命名）** 强制使用 **宏命名法** 规则，只能包含 **英文大写字母（A-Z）**、**下划线 "_"** 和 **数字（0-9）**。禁止首位字符出现数字。单词间以 **下划线 "_" 分隔**。

:::note
注意：这里的常量（或宏）仅针对基础数据类型（`Boolean`\\`Number`\\`String`\\`BigInt`等），复杂数据类型不建议被当作常量（或宏）。

```ts
// 符合要求
const MAX_STRING_LENGTH = 2048
// 不符合要求
const DEFAULT_CONFIG = { hidden: true }
// 建议直接定义成普通变量，因为无法保障其复杂对象引用值（属性等）不被修改。
const defaultConfig = { hidden: true }
```
:::

**结构体**、**枚举**、**类命名** 强制使用 **帕斯卡命名法** 或 **大驼峰命名法** 规则。

**函数（或方法）** 命名强制使用 **小驼峰命名法** 规则。

布尔类型的变量使用 `is`、`can`、`should`、`need` 或 `has` 等前缀。

类的私有属性或方法使用 "#" 前缀修饰，规避使用 `private` 关键字——"#" 能很明确区分该类的属性或方法属于私有，外部无法引用——但是通过浏览器 DevTools 工具能看到其值。

**不鼓励含拼音组成的命名，禁止使用拼音和英文单词混合的命名**。

:::tip
OpenGL 以及 Windows API 库命名喜欢使用单词缩写，比如 背景色 `backgroundColor` 常简化为 `bgColor`、按钮 `button` 简化为 `btn`。但是这里存有潜在问题：① 缩写规则无法统一；② 有些缩写重复造成的歧义或历时久远忘记缩写前的单词真实意义。  
简言之，大量的缩写命名会出现沟通成本，这里建议尽量保留完整的单词。`bgColor`、`btn` 语义明确的可以接受，比如矩阵 `matrix` 被缩写成 `mat` 或 `mtx` 就不适合，建议保留完整单词。
:::

### 大小写规则

若单词由纯小写字母组成，则首字母大写即可。但有些专有名词会出现大小写混合、或纯大写情况，首字母大写的规则要求如下：

❶ 大小写混合，且首字母为小写：首字母调整为大写，其他不变——比如 vCard 对应的规则即 VCard，相关的函数命名应该是 `getVCard()` 。  
❷ 大小写混合，且首字母为大写：直接使用——比如 MySQL（无大小写调整）相关的函数命名 `getMySQLHost()` 。  
❸ 纯大写：直接使用——比如 ID （无大小写调整）相关的函数命名 `getListID()`。

图表：常见大小写混合专有名词

 **专有名词**| **名词解释**
---------------------------------|------------------------------------------------------------------------
 ID                              | Identity document，身份标识号。
 DOM                             | Document Object Model，文档对象模型。
 HTTP                            | HyperText Transfer Protocol，超文本传输协议。
 vCard                           | 电子名片一般包含姓名、地址、电子邮箱、头像等字段信息。
 iOS/macOS/iPadOS/watchOS/tvOS   | Apple 操作系统名称规则。
 OAuth                           | 一个关于授权（authorization）的开放网络标准，在全世界得到广泛应用，目前的版本是2.0版，对应的标准说明文档为RFC 6749。
 MySQL/SQLite                    | SQL 数据库相关。

:::warning 需要注意两点事项
① **首字母大写规则** 适用于 **多个单词组成的变量** 或 **类、枚举、函数等复杂数据类型** 需要单词首个字符需要大写的场景判断，**普通一个单词变量建议首字符小写或纯小写**。

```ts
// 纯大写专有名词单词变量，可以直接转小写。
const id = '21388'
const xml = '<svg></svg>'

// 首字符大写但非纯大写的专有名词变量，首字符转小写。
const oAuth = 'rfc-6749' 

// 大小写混合的专有名词单词变量，建议首字母小写，其他字符保持不变。
const vCard = { name: 'juyipeng' }
```

② 如果连续出现多个纯大写的专有名词时（**特殊情况**），为了区分专有名词可以将后面的纯大写专有名词规则调整为首字符大写，其他字符均小写。

```ts
class XMLHTTPRequest {
  // ... 
}
// 按照规范命名 XMLHTTPRequest 命名，容易将 XMLHTTP 当成一个专有名词，但其实是 XML、HTTP 两个。
class XMLHttpRequest {
  // ... 
}
// 调整为 XMLHttpRequest 这样的就好区分为 XML、HTTP 两个专有名词。
```

:::

## “重复代码（Duplicated Code）”

## “过长函数（Long Function）”

## “过长参数列表（Long Parameter List）”

## “全局数据（Global Data）”

## “可变数据（Mutable Data）”

## “发散式变化（Divergent Change）”

## “霰弹式修改（Shotgun Surgery）”

## “依恋情结（Feature Envy）”

## “数据泥团（Data Clumps）”

## “基本类型偏执（Primitive Obsession）”

## “重复的switch （Repeated Switches）”

## “循环语句（Loops）”

## “冗赘的元素（Lazy Element）”

## “夸夸其谈通用性（Speculative Generality）”

## “临时字段（Temporary Field）”

## “过长的消息链（Message Chains）”

## “中间人（Middle Man）”

## “内幕交易（Insider Trading）”

## “过大的类（Large Class）”

## “异曲同工的类（Alternative Classes with Different Interfaces）”

## “纯数据类（Data Class）”

## “被拒绝的遗赠（Refused Bequest）”

## “注释（Comments）”
