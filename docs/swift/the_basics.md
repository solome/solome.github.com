# 基础部分

Work with common kinds of data and write basic syntax.

Swift 是一门开发 iOS、iPadOS、macOS、watchOS 和 tvOS 应用的新语言。然而，如果你有 C 或者 Objective-C 开发经验的话，你会发现 Swift 的很多内容都是你熟悉的。

Swift provides many fundamental data types, including `Int` for integers, `Double` for floating-point values, `Bool` for Boolean values, and `String` for text. Swift also provides powerful versions of the three primary collection types, `Array`, `Set`, and `Dictionary`, as described in [Collection Types](./).

Swift uses variables to store and refer to values by an identifying name. Swift also makes extensive use of variables whose values can’t be changed. These are known as constants, and are used throughout Swift to make code safer and clearer in intent when you work with values that don’t need to change.

In addition to familiar types, Swift introduces advanced types such as tuples. Tuples enable you to create and pass around groupings of values. You can use a tuple to return multiple values from a function as a single compound value.

Swift also introduces optional types, which handle the absence of a value. Optionals say either “there is a value, and it equals x” or “there isn’t a value at all”.

Swift is a **type-safe** language, which means the language helps you to be clear about the types of values your code can work with. If part of your code requires a `String`, type safety prevents you from passing it an `Int` by mistake. Likewise, type safety prevents you from accidentally passing an optional `String` to a piece of code that requires a non-optional `String`. Type safety helps you catch and fix errors as early as possible in the development process.

## Constants and Variables

Constants and variables associate a name (such as `maximumNumberOfLoginAttempts` or `welcomeMessage`) with a value of a particular type (such as the number 10 or the string "Hello"). The value of a constant can’t be changed once it’s set, whereas a variable can be set to a different value in the future.

### Declaring Constants and Variables

### Type Annotations

### Naming Constants and Variables

### Printing Constants and Variables

## Comments

## Semicolons

## Integers

## Floating-Point Numbers

## Type Safety and Type Inference

## Numeric Literals

## Numeric Type Conversion

## Type Aliases

## Booleans

## Tuples

## Optionals

## Error Handling

## Assertions and Preconditions
