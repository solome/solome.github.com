
# 人工智能概述

:::note

LLM 章节内容结构原本源于 **陈敏凯Marco** [《一站式 LLM 底层技术原理入门指南》​](https://s3tlxskbq3.feishu.cn/docx/NyPqdCKraoXz9gxNVCfcIFdnnAc)一文整理——但原文偏科普，本站基于原文目录结构重新整理（用于构建个人 LLM 相关知识体系）。
:::

## 一、人工智能概念与分支

人工智能（Artificial Intelligence）是让各类机器载体上模拟并拥有类似生物的智能，让机器可以进行感知、学习、识别、推理等行为的计算机科学技术。

人工智能是计算机科学的分支，涉及领域包括**计算机视觉（Computer Vision，CV）**、**自然语言处理（Natural Language Processing，NLP）**、**语音识别（Voice Recognition）**、**语音生成（Text to Speech，TTS）**、**知识图谱（Knowledge Graph）** 等。

从学术角度来看，人工智能领域目前有如下几个学派~

### 1. 符号主义（Symbolicism）

符号主义（Symbolicism）是人工智能领域最早的学派之一，其核心思想是通过 **符号操作**、**逻辑推理** 和 **知识驱动** 来 **模拟** 人类智能。该学派下的经典实践（尝试）主要有**逻辑理论家（Logic Theorist）**、**专家系统（Expert Systems）** 和 **Prolog**（**Pro**gramming in **Log**ic）。

**逻辑理论家** 是人工智能领域的里程碑式成果，由**艾伦·纽厄尔（Allen Newell）**、**赫伯特·西蒙（Herbert Simon）** 和 **克利夫·肖（Cliff Shaw）** 于1956年开发。它是首个通过符号操作和逻辑推理模拟人类思维的计算机程序，标志着符号主义学派的诞生。

**专家系统** 通过模拟人类专家的决策过程，利用专业知识解决特定领域的复杂问题——将人类专家的知识和经验编码为计算机可处理的规则，辅助或替代专家进行决策。代表案例有 Dendral（1965，根据质谱数据推断有机分子结构）、MYCIN（1976，细菌感染诊断与抗生素推荐、未实际投入临床使用）、XCON（1980，根据客户需求定制 VAX 计算机硬件组合、首个商用专家系统）。

**Prolog** 是一种基于逻辑的声明式编程语言，专为符号计算和自动推理设计。其核心思想是通过描述问题的逻辑关系，让系统自动推导出解决方案，而非逐步指令执行。Prolog 程序一般由 **事实（Facts）**、**规则（Rules）**、**查询（Queries）** 三部分构成。比如《红楼梦》明确各个人物之间的事实、规则之后，可以查询彼此之间的亲属关系（基于 [swi-prolog](https://www.swi-prolog.org/)）。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="facts" label="事实（Facts）">
```prolog
male(贾演).      % 宁国公（贾家始祖）
male(贾代化).    % 贾演之子
male(贾敷).      % 贾代化长子（早夭）
male(贾敬).      % 贾代化次子
male(贾珍).      % 贾敬之子
male(贾蓉).      % 贾珍之子
male(贾代善).    % 荣国公（贾母之夫）
male(贾赦).      % 贾代善长子
male(贾政).      % 贾代善次子
male(贾珠).      % 贾政长子（早亡）
male(贾宝玉).    % 贾政次子
male(贾环).      % 贾政三子（赵姨娘生）
male(贾琏).      % 贾赦之子
female(贾敏).    % 贾代善之女（林黛玉之母）
female(贾元春).  % 贾政长女
female(贾迎春).  % 贾赦之女
female(贾探春).  % 贾政之女（赵姨娘生）
female(贾惜春).  % 贾敬之女
female(王夫人).  % 贾政正妻
female(邢夫人).  % 贾赦续弦
female(赵姨娘).  % 贾政妾室
female(林黛玉).  % 贾敏之女
female(薛宝钗).  % 王夫人外甥女
```
  </TabItem>
  <TabItem value="rules" label="规则（Rules）">
```prolog
father(Father, Child) :- 
    parent(Father, Child), 
    male(Father).

mother(Mother, Child) :- 
    parent(Mother, Child), 
    female(Mother).

sibling(S1, S2) :- 
    parent(P, S1), 
    parent(P, S2), 
    S1 \= S2.

brother(Brother, Person) :- 
    sibling(Brother, Person), 
    male(Brother).

sister(Sister, Person) :- 
    sibling(Sister, Person), 
    female(Sister).

/* ---------- 中式宗法称谓规则 ---------- */
% 直系尊亲
称呼(Self, Relative, '祖父') :- 
    father(Father, Self), 
    father(Relative, Father).

称呼(Self, Relative, '祖母') :- 
    father(Father, Self), 
    mother(Relative, Father).

% 父辈兄弟及其子女（堂亲）
称呼(Self, Relative, '伯父') :- 
    father(Father, Self), 
    brother(Relative, Father), 
    older(Relative, Father).

称呼(Self, Relative, '叔父') :- 
    father(Father, Self), 
    brother(Relative, Father), 
    younger(Relative, Father).

称呼(Self, Relative, '堂兄') :- 
    father(Father, Self), 
    brother(Uncle, Father), 
    son(Relative, Uncle), 
    older(Relative, Self).

% 母系亲属（外亲）
称呼(Self, Relative, '外祖父') :- 
    mother(Mother, Self), 
    father(Relative, Mother).

称呼(Self, Relative, '外祖母') :- 
    mother(Mother, Self), 
    mother(Relative, Mother).

称呼(Self, Relative, '表妹') :- 
    mother(Mother, Self), 
    sister(Aunt, Mother), 
    daughter(Relative, Aunt), 
    younger(Relative, Self).

% 特殊案例：林黛玉与贾宝玉关系
称呼(贾宝玉, 林黛玉, '表妹') :- 
    mother(王夫人, 贾宝玉), 
    sister(贾敏, 王夫人), 
    daughter(林黛玉, 贾敏).

% 薛宝钗与贾宝玉关系（姨表亲）
称呼(贾宝玉, 薛宝钗, '表姐') :- 
    mother(王夫人, 贾宝玉), 
    sister(薛姨妈, 王夫人), 
    daughter(薛宝钗, 薛姨妈), 
    older(薛宝钗, 贾宝玉).
```

  </TabItem>
  <TabItem value="queries" label="查询（Queries）" default>
```prolog
% 加载规则和事实
?- consult('kinship.pl'), consult('hongloumeng_facts.pl').

% 查询贾宝玉的父亲
?- 称呼(贾宝玉, X, '父亲').
X = 贾政.

% 查询林黛玉的表哥（需扩展规则）
?- 称呼(林黛玉, 贾宝玉, Title).
Title = '表哥'.
```
  </TabItem>
</Tabs>

### 2. 联结主义（Connectionism）

联结主义（Connectionism）源于仿生学，试图通过模拟大脑神经网络的结构和功能来实现人工智能。

联结主义的思想可以追溯到 20 世纪 40 年代，当时心理学家唐纳德・赫布（Donald Hebb）提出了 **[赫布理论（Hebbian theory）](https://archive.org/details/organizationofbe00hebbrich/mode/2up)**，描述了神经元之间的突触连接如何随着经验而改变，为联结主义的发展奠定了理论基础。  

20 世纪 50 年代到 60 年代，出现了一些早期的神经网络模型，如 **感知机（Perceptron）**，但由于当时计算能力的限制和理论上的一些问题，神经网络的研究在 70 年代陷入了低谷。

20 世纪 80 年代，随着计算能力的提升和**反向传播算法（Backpropagation Algorithm）**的提出，神经网络重新受到关注，并取得了一系列重要成果，如在图像识别、语音识别等领域的应用。

20 世纪 90 年代以后，随着 **深度学习（Deep Learning）** 技术的兴起，联结主义得到了进一步的发展和广泛应用，成为人工智能领域的主流方法之一。

联结主义的基本单元是**神经元**，它模拟了生物神经元的功能。一个神经元通常有多个输入和一个输出，输入通过突触连接到其他神经元的输出，每个突触都有一个权重，表示连接的强度。神经元接收到输入信号后，会将其加权求和，并通过一个 **激活函数（Activation Function）** 产生输出。常见的激活函数有 `Sigmoid()` 函数、`ReLU()` 函数等。

**神经网络** 是由大量神经元相互连接组成的网络。根据神经元之间的连接方式，可以分为 **前馈神经网络（Feedforward Neural Network）**、**循环神经网络（Recurrent Neural Network）** 等。前馈神经网络中，神经元按照层次排列，信息从输入层依次向前传播到输出层；循环神经网络中，神经元之间存在反馈连接，信息可以在网络中循环传播，能够处理序列数据。

联结主义通过**学习算法**来调整神经元之间的权重，以使神经网络能够适应特定的任务。常见的学习算法有 **监督学习（Supervised Learning）**、**无监督学习（Unsupervised Learning）** 和 **强化学习（Reinforcement Learning）** 等。监督学习中，训练数据包含了输入和对应的输出，神经网络通过最小化预测输出与真实输出之间的误差来调整权重；无监督学习中，训练数据只包含输入，神经网络通过发现数据中的模式和结构来学习；强化学习中，智能体通过与环境进行交互，根据环境反馈的奖励信号来学习最优的行为策略。

联结主义的典型实践（案例）有 **图像识别**、**语音识别** 和 **自然语言处理**。

**卷积神经网络（Convolutional Neural Network，CNN）** 能够自动提取图像的特征，用于图像分类、目标检测、图像分割等任务——在人脸识别系统、自动驾驶中的交通标志识别领域取得成功。

**循环神经网络（Recurrent Neural Network，RNN）**及其变体 **长短时记忆网络（Long Short-Term Memory network，LSTM）**、**门控循环单元（Gated Recurrent Unit，GRU）** 等在语音识别中得到了广泛应用。它们能够处理语音信号的时序信息，将语音转换为文字。

在自然语言处理领域，联结主义被用于文本分类、情感分析、机器翻译、问答系统等任务。例如，基于**注意力机制（Attention Mechanism）** 的神经网络模型在机器翻译中取得了很好的效果，能够更好地处理长序列文本。

### 3. 行为主义（Actionism）



## 二、机器学习

## 三、机器学习分类一：根据学习范式分类

## 四、机器学习分类二：根据网络的深度和复杂度分类

## 五、深度学习（Deep Learning）
