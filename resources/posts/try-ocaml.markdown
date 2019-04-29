---
layout: layout/post
title:  "OCaml初探"
date:   2016-08-16 15:26:12 +0800
categories: ocaml
---

## 安装

macOS 系统通过[Homebrew](http://brew.sh/)安装：

```
brew install ocaml
brew install opam
```

## 注释

```ocaml
(* 此处是单注释 *)

(*
  此处是多行注释
*)
```

## 函数调用

```ocaml
plus a 3 (* a和3是函数plus的参数*)
```

## 函数定义

```ocaml
let hello () =
  print_endline "Hello World"

hello()

let average a b =
  (a +. b) /. 2.0

sum 4 8

```

## 匿名函数定义

```ocaml
let sum = fun a b -> (a +. b) /. 2.0

List.map (fun i -> i*2) [1;2;3;]
```


## 数据类型

```ocaml

int     31-bit signed int (roughly +/- 1 billion) on 32-bit
        processors, or 63-bit signed int on 64-bit processors

float   IEEE double-precision floating point, equivalent to C\'s double

bool    A boolean, written either true or false

char    8-bit

string  

unit    Written as ()

```


## 递归函数

```ocaml
let rec factorial n =
  if n <= 1 then
    1
  else
    factorial (n-1) * n
```

## 局部变量

```ocaml
let average a b =
  let sum = a +. b in
  sum /. 2.0
```

## 引用

```ocaml
let var_ref = ref 0

var_ref := 100      (* := 更改var_ref值 *)

!var_ref            (* ! 查看var_ref引用的值*)
```

## 数据结构

```ocaml
(* List *)
[1; 2; 3]

(* Tuple *)
(3, "hello", 'x')

(* Record *)
(*
type pair =
  {a: int; b: string}
*)

{ a = 3; b = "hello" }

(* Variant *)

```





