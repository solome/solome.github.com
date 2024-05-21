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

Constants and variables must be declared before they’re used. You declare constants with the `let` keyword and variables with the `var` keyword. Here’s an example of how constants and variables can be used to track the number of login attempts a user has made:

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

This code can be read as:

“Declare a new constant called `maximumNumberOfLoginAttempts`, and give it a value of 10. Then, declare a new variable called `currentLoginAttempt`, and give it an initial value of 0.”

In this example, the maximum number of allowed login attempts is declared as a constant, because the maximum value never changes. The current login attempt counter is declared as a variable, because this value must be incremented after each failed login attempt.

If a stored value in your code won’t change, always declare it as a constant with the `let` keyword. Use variables only for storing values that change.

When you declare a constant or a variable, you can give it a value as part of that declaration, like the examples above. Alternatively, you can assign its initial value later in the program, as long as it’s guaranteed to have a value before the first time you read from it.

```swift
var environment = "development"
let maximumNumberOfLoginAttempts: Int
// maximumNumberOfLoginAttempts has no value yet.

if environment == "development" {
    maximumNumberOfLoginAttempts = 100
} else {
    maximumNumberOfLoginAttempts = 10
}
// Now maximumNumberOfLoginAttempts has a value, and can be read.
```

In this example, the maximum number of login attempts is constant, and its value depends on the environment. In the development environment, it has a value of 100; in any other environment, its value is 10. Both branches of the if statement initialize `maximumNumberOfLoginAttempts` with some value, guaranteeing that the constant always gets a value. For information about how Swift checks your code when you set an initial value this way, see [Constant Declaration](./).

You can declare multiple constants or multiple variables on a single line, separated by commas:

```swift
var x = 0.0, y = 0.0, z = 0.0
```

### Type Annotations

You can provide a type annotation when you declare a constant or variable, to be clear about the kind of values the constant or variable can store. Write a type annotation by placing a colon after the constant or variable name, followed by a space, followed by the name of the type to use.

This example provides a type annotation for a variable called `welcomeMessage`, to indicate that the variable can store `String` values:

```swift
var welcomeMessage: String
```

The colon in the declaration means “…of type…,” so the code above can be read as:

**“Declare a variable called welcomeMessage that’s of type String.”**

The phrase “of type String” means “can store any `String` value.” Think of it as meaning “the type of thing” (or “the kind of thing”) that can be stored.

The welcomeMessage variable can now be set to any string value without error:

```swift
welcomeMessage = "Hello"
```

You can define multiple related variables of the same type on a single line, separated by commas, with a single type annotation after the final variable name:

```swift
var red, green, blue: Double

```

:::note
It’s rare that you need to write type annotations in practice. If you provide an initial value for a constant or variable at the point that it’s defined, Swift can almost always infer the type to be used for that constant or variable, as described in [Type Safety and Type Inference](./). In the welcomeMessage example above, no initial value is provided, and so the type of the welcomeMessage variable is specified with a type annotation rather than being inferred from an initial value.
:::

### Naming Constants and Variables

Constant and variable names can contain almost any character, including Unicode characters:

```swift
let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"
```

Constant and variable names can’t contain whitespace characters, mathematical symbols, arrows, private-use Unicode scalar values, or line- and box-drawing characters. Nor can they begin with a number, although numbers may be included elsewhere within the name.

Once you’ve declared a constant or variable of a certain type, you **can’t declare it again with the same name**, or change it to store values of a different type. Nor can you change a constant into a variable or a variable into a constant.

:::note
If you need to give a constant or variable the same name as a reserved Swift keyword, surround the keyword with backticks (`) when using it as a name. However, avoid using keywords as names unless you have absolutely no choice.
:::

You can change the value of an existing variable to another value of a compatible type. In this example, the value of `friendlyWelcome` is changed from "Hello!" to "Bonjour!":

```swift
var friendlyWelcome = "Hello!"
friendlyWelcome = "Bonjour!"
// friendlyWelcome is now "Bonjour!"
```

Unlike a variable, the value of a constant can’t be changed after it’s set. Attempting to do so is reported as an error when your code is compiled:

```swift
let languageName = "Swift"
languageName = "Swift++"
// This is a compile-time error: languageName cannot be changed.
```

### Printing Constants and Variables

You can print the current value of a constant or variable with the `print(_:separator:terminator:)` function:

```swift
print(friendlyWelcome)
// Prints "Bonjour!"
```

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
