# 降低圈复杂度：一种有效的代码优化策略

## 一、圈复杂度概念

**圈复杂度**（Cyclomatic complexity，简写CC）也称为 **条件复杂度** 或 **循环复杂度**，是一种代码复杂度的衡量标准。

由 **Thomas J. McCabe** 于1976年（[McCabe1976](https://www.cs.mtsu.edu/~untch/6050/private/McCabe1976.pdf)）提出，用来表示程序的复杂度，其符号为 `VG` 或是 `M`。它可以用来衡量一个模块判定结构的复杂程度，数量上表现为独立路径的条数，也可理解为覆盖所有的可能情况最少使用的测试用例数。圈复杂度大说明程序代码的判断逻辑复杂，可能质量低且难于测试和维护——程序的逻辑出错率和圈复杂度呈正相关关系。

原则上，一个方法（函数）的圈复杂度最好保持在 10 以内。这是因为对人类记忆力的研究表明，人的短期记忆只能存储 7 件事（偏差为正负 2）。如果开发人员编写的代码有 50 个线性独立的路径，那么为了在头脑中描绘出方法中发生的情况，需要的记忆力大约超过短期记忆容量的5倍。简单的方法不会超过人的短期记忆力的极限，因此更容易应付，事实证明它们的错误更少——
[Enerjy](https://www.youtube.com/watch?v=zl-EXpcRhDg) 在2008年所做的研究表明，在圈复杂度与错误数量之间有很强的相关性。复杂度为 11 的类的出错概率为 0.28，而复杂度为 74的类的出错概率会上升到 0.98。

## 二、圈复杂度计算方法

### 2.1 点边计算法

<figure style={{textAlign: "center"}}>
  <img style={{maxWidth: '200px'}} src="/img/cc_1.svg " />
  <figcaption>图一：源码结构点、边定义</figcaption>
</figure>

圈复杂度的点边计算方法很简单，计算公式为：

$$
V(G)=E-N+2
$$

其中，$E$ 表示控制流图中边的数量，$N$ 表示控制流图中节点的数量。比如 `if-then-else`、`do-while` 等典型的控制流的点、边情况如下：

<figure style={{textAlign: "center"}}>
  <img style={{maxWidth: '540px'}} src="/img/cc_2.svg " />
  <figcaption>图二：典型控制流的点、边情况</figcaption>
</figure>

### 2.2 节点判定法

其实，圈复杂度的计算还有更直观的方法，因为圈复杂度所反映的是“判定条件”的数量，所以**圈复杂度实际上就是等于判定节点的数量再+1**，也即控制流图的区域数，对应的计算公式为：

$$
V(G)=P+1
$$

其中，$P$ 为判定节点数，节点判定举例：

- `if()` 语句
- `while()` {} 语句
- `for()` 语句
- `foreach()` 语句
- `do {} while ()` 语句
- `switch() case {}` 语句（`switch` 中每个 `case` 都是一个复杂度）
- `try {} catch () {}` 语句
- `&&` 和 `||` 布尔操作
- `?:` 三元运算符

对于多分支的 `case` 结构或 `if-elseif-else` 结构，统计判定节点的个数时需要特别注意一点，要求必须统计全部实际的判定节点数，也即每个 `elseif` 语句，以及每个 `case` 语句，都应该算为一个判定节点。

判定节点在模块的控制流图中很容易被识别出来——因此，**针对程序的控制流图**计算圈复杂度 $V(G)$ 时，一般采用点边计算法，也即 $V(G)=E-N+2$；而**针对模块的控制流图**时，可以直接使用统计判定节点数，这样更为简单。

## 三、圈复杂度统计工具

目前成熟度高、且笔者一直在用的是 [lizard](https://pypi.org/project/lizard/)，支持 TypeScript、C/C++/Rust、Swift等常用编程语言。

### 3.1 安装 lizard

[lizard](https://pypi.org/project/lizard/) 由 Python 语言实现，你可以通过 [pip](https://pypi.org/project/pip/) 直接安装到系统中：

```bash
pip install lizard
pipx install lizard # 如果是最新版 macOS 系统终端

lizard -h # 查看命令参数细节
```

### 3.2 相关专业术语说明

[lizard](https://pypi.org/project/lizard/) 分析结果会涉及到一些专业术语，这类整理中文理解如下：

- **NLOC**: the nloc (lines of code without comments) 不包含注释的代码行数。
- **CCN**: cyclomatic complexity number 圈复杂度也就是分支复杂度，最好保持在10 以下。
- **token**: token count of functions. token 的个数（关键字，标示符，常量，标点符号，操作符）。
- **param**: parameter count of functions. 参数统计数就是函数的参数个数。
- **Cnt**: Count 的缩写。
- **Rt**: Rate 的缩写。

举例说明，比如有一段如下源码：
```swift title="./getTeamScore.swift" showLineNumbers
// 根据团队成员成绩计算团队（队伍）成绩
func getTeamScore(scores individualScores: [Int]) -> Int {
  var teamScore = 0
  for score in individualScores {
    if score > 50 {
      teamScore += 3
    } else {
      teamScore += 1
    }
  }
  return teamScore
}

// 测试类
class TeamScore {
  func run() {
    let individualScores = [75, 43, 103, 87, 12]
    print(getTeamScore(scores: individualScores))
  }
}
```

可以通过 [lizard](https://pypi.org/project/lizard/) 命令分析该源码的圈复杂度情况。

```bash
lizard ./getTeamScore.swift
lizard ./ -C 10 # 笔者常用的配参，会将圈复杂度 ≥10 的方法（函数）标注出来。
```
说明 `getTeamScore()` 函数的有效源码是 11 行，圈复杂度是 3，有 41 个token，1 个参数。

```bash
================================================
  NLOC    CCN   token  PARAM  length  location  
------------------------------------------------
      11      3     41      1      11 getTeamScore@2-12@getTeamScore.swift
       4      1     29      0       4 run@16-19@getTeamScore.swift
1 file analyzed.
==============================================================
NLOC    Avg.NLOC  AvgCCN  Avg.token  function_cnt    file
--------------------------------------------------------------
     17       7.5     2.0       35.0         2     getTeamScore.swift

==================================================================================
No thresholds exceeded (cyclomatic_complexity > 15 or length > 1000 or nloc > 1000000 or parameter_count > 100)
==================================================================================
Total nloc   Avg.NLOC  AvgCCN  Avg.token   Fun Cnt  Warning cnt   Fun Rt   nloc Rt
------------------------------------------------------------------------------------------
        17       7.5     2.0       35.0        2            0      0.00    0.00
```

## 四、圈复杂度意义

圈复杂度可以间接量化源码的逻辑复杂度、且给源码逻辑测试提供量化数据指导。低圈复杂度可以降低研发人员的理解、后续迭代的维护成本。作为一名研发，可以将追求源码的低圈复杂度作为切入点，真正践行“在缺陷成为缺陷之前捕获它们”。

### 4.1 圈复杂度和软件质量

一般来说，圈复杂度≥10的方法（函数）意味着存在很大的出错风险。圈复杂度和缺陷个数有高度的正相关：**圈复杂度最高的模块和方法（函数），其引申出来的缺陷个数也可能最多**。

<table>
    <thead>
        <tr>
            <th>圈复杂度区间</th>
            <th>源码质量</th>
            <th>可测性</th>
            <th>维护成本</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{backgroundColor: "hsl(120deg 100% 25% / 50%)"}}>
            <th>[1, 10)</th>
            <td>清晰、结构化</td>
            <td>高</td>
            <td>低</td>
        </tr>
        <tr style={{backgroundColor: "hsl(60 100% 50% / 1)"}}>
            <th>[10, 20)</th>
            <td>复杂</td>
            <td>中</td>
            <td>中</td>
        </tr>
        <tr style={{backgroundColor: "rgb(255 0 0 / 50%)"}}>
            <th>[20, 30)</th>
            <td>非常复杂</td>
            <td>低</td>
            <td>高</td>
        </tr>
        <tr style={{backgroundColor: "#980a0a", color: "white"}}>
            <th>≥30</th>
            <td>不可读</td>
            <td>不可测</td>
            <td>非常高</td>
        </tr>
    </tbody>
</table>

### 4.2 圈复杂度与测试

圈复杂度可以为**测试设计提供很好的参考**——一个好的测试用例设计经验是：创建数量与被测代码圈复杂度值相等的测试用例，以此提升用例对代码的分支覆盖率。

测试驱动开发（TDD, Test-Driven Development）和低圈复杂度值之间存在着紧密联系。在编写测试时，开发人员会考虑代码的可测试性，倾向于编写简单的代码，因为复杂的代码难以测试。因此 TDD 的「代码 ➯ 测试 ➯ 代码 ➯ 测试」 循环将导致频繁重构，驱使非复杂代码的开发。


### 4.3 圈复杂度与遗留源码

对于遗留代码的维护或重构，测量圈复杂度特别有价值。一般使用圈复杂度作为提升源码指标的输入指标——圈复杂度越低、源码质量越好。

### 4.4 圈复杂度与CI监控

在持续集成环境中，可以基于时间变化维度来评估模块或函数的复杂度和增长值。如果圈复杂度值在不断增长，那么应该开展两项活动：

- 确保相关测试的有效性，减少故障风险。
- 评估重构必要性和具体落地方式，以降低即将出现的源码维护成本高的风险。

## 五、降低圈复杂度技巧

### 5.1 重新组织你的函数

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**技巧1: 提炼函数**

**提炼函数**即将一个复杂函数中的某些逻辑提炼出来、拆分为多个小函数，这些小函数圈复杂度低、理解成本低且易于测试。

比如实现一个函数，参数是一个由字符串和整数组成的数组，需要将该数组中的合法的字符串转换成整数，并将其中的质数筛选出来。

<Tabs>
  <TabItem value="tip1_wrong" label="待优化">
```rust title="函数 filter_primes_from_mixed_array() 圈复杂度为11。"
pub fn filter_primes_from_mixed_array(mixed_array: Vec<&dyn std::fmt::Display>) -> Vec<i32> {
    let mut primes = Vec::new();
    for item in mixed_array {
        let item_as_string = item.to_string();
        if let Ok(num) = item_as_string.parse::<i32>() {
            if num <= 1 {
                continue;
            }

            if num <= 3 {
                primes.push(num);
                continue;
            }
            if num % 2 == 0 || num % 3 == 0 {
                continue;
            }

            let mut i = 5;

            let mut flag = true;
            while i * i <= num {
                if num % i == 0 || num % (i + 2) == 0 {
                    flag = false;
                    break;
                }
                i += 6;
            }

            if flag == true {
                primes.push(num)
            }
        }
    }
    primes
}
```
  </TabItem>
  <TabItem value="tip2_correct" label="重构后">
```rust title="剥离出 is_prime()函数，不会出现圈复杂度 ≥10 的函数。"
pub fn is_prime(num: i32) -> bool {
    if num <= 1 {
        return false;
    }
    if num <= 3 {
        return true;
    }
    if num % 2 == 0 || num % 3 == 0 {
        return false;
    }
    let mut i = 5;
    while i * i <= num {
        if num % i == 0 || num % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    true
}

pub fn filter_primes_from_mixed_array(mixed_array: Vec<&dyn std::fmt::Display>) -> Vec<i32> {
    let mut primes = Vec::new();
    for item in mixed_array {
        let item_as_string = item.to_string();
        if let Ok(num) = item_as_string.parse::<i32>() {
            if is_prime(num) {
                primes.push(num);
            }
        }
    }
    primes
}
```
  </TabItem>
</Tabs>

重构前圈复杂度为 11 的`filter_primes_from_mixed_array()` 函数对研发人员来说，阅读、理解的压力是巨大的。

**技巧2: 替换算法**

选择圈复杂度更低的算法去重新实现你的函数，比如典型的有用空间复杂度替换时间复杂度（高时间复杂度往往也意味着逻辑复杂）算法、同类型的条件判断使用字典这类数据结构替换等思路。

<Tabs>
  <TabItem value="tip1_wrong" label="待优化">
```rust title="圈复杂度为 13、判断冗余。"
pub fn number_to_month_conditional(number: u32) -> Option<&'static str> {
  if number == 1 {
      Some("January")
  } else if number == 2 {
      Some("February")
  } else if number == 3 {
      Some("March")
  } else if number == 4 {
      Some("April")
  } else if number == 5 {
      Some("May")
  } else if number == 6 {
      Some("June")
  } else if number == 7 {
      Some("July")
  } else if number == 8 {
      Some("August")
  } else if number == 9 {
      Some("September")
  } else if number == 10 {
      Some("October")
  } else if number == 11 {
      Some("November")
  } else if number == 12 {
      Some("December")
  } else {
      None
  }
}
```
  </TabItem>

  <TabItem value="tip2_correct" label="重构一">
```rust title="通过 HashMap 规避 if 条件判断。"
use std::collections::HashMap;

pub fn number_to_month_hashmap(number: u32) -> Option<&'static str> {
  // 用空间换时间
  let mut month_map = HashMap::new();
  month_map.insert(1, "January");
  month_map.insert(2, "February");
  month_map.insert(3, "March");
  month_map.insert(4, "April");
  month_map.insert(5, "May");
  month_map.insert(6, "June");
  month_map.insert(7, "July");
  month_map.insert(8, "August");
  month_map.insert(9, "September");
  month_map.insert(10, "October");
  month_map.insert(11, "November");
  month_map.insert(12, "December");

  month_map.get(&number).cloned()
}
```
  </TabItem>
  <TabItem value="tip3_correct" label="重构二">
```rust title="使用 Rust 的 match 语法风格上可以更优雅、简洁，且更易读。"
pub fn number_to_month_match(number: u32) -> Option<&'static str> {
  match number {
      1 => Some("January"),
      2 => Some("February"),
      3 => Some("March"),
      4 => Some("April"),
      5 => Some("May"),
      6 => Some("June"),
      7 => Some("July"),
      8 => Some("August"),
      9 => Some("September"),
      10 => Some("October"),
      11 => Some("November"),
      12 => Some("December"),
      _ => None,
  }
}
```
  </TabItem>
</Tabs>
### 5.2 简化条件表达式

**技巧3: 逆向表达**

**技巧4: 分解条件**

**技巧5: 合并条件**

**技巧6: 移除临时标记变量**

**技巧7: 以多态取代条件判断**


### 5.3 简化函数调用

**技巧8: 读写分离**

**技巧9: 参数化方法**

**技巧10: 以明确函数取代参数**


## 六、一些答疑解惑

### 6.1 高圈复杂度的源码是否意味着可维护性差？

### 6.2 圈复杂度相同的源码是否维护性一致？

简言之，圈复杂度可以**间接**量化源码的逻辑复杂度，但不是唯一量化指标。常见的指标还有**单元测试覆盖率**、**源码的认知复杂度**（Cognitive Complexity）、**源码重复度**、**“源码坏味道”**（Code Smells）等，本文暂不深度展开——有兴趣可以通过相关关键字去检索、调研。

## 附录

- A Complexity Measure [McCabe1976.pdf](https://www.cs.mtsu.edu/~untch/6050/private/McCabe1976.pdf).
- [详解圈复杂度](https://kaelzhang81.github.io/2017/06/18/%E8%AF%A6%E8%A7%A3%E5%9C%88%E5%A4%8D%E6%9D%82%E5%BA%A6/)。