---
sidebar_position: 1
---

# Swift 初探

通常来说，编程语言教程中的第一个程序应该在屏幕上打印“Hello, world”。在 Swift 中，可以用一行代码实现：

```swift
print("Hello, world~")
```

如果你写过 C 或者 Objective-C 代码，那你应该很熟悉这种形式——在 Swift 中，这行代码就是一个完整的程序。你不需要为了输入输出或者字符串处理导入一个单独的库。全局作用域中的代码会被自动当做程序的入口点，所以你也不需要 `main()` 函数。

你**不需要在每个语句结尾写上分号**。

## 简单值

使用 `let` 来声明常量，使用 `var` 来声明变量。一个常量的值，在编译的时候，并不需要有明确的值，但是你只能为它赋值一次。这说明你可以用一个常量来命名一个值，一次赋值就可在多个地方使用。

```swift
var myVariable = 42
myVariable = 50
let myConstant = 42
```

常量或者变量的类型必须和你赋给它们的值一样。然而，你不用明确地声明类型。当你通过一个值来声明变量和常量时，编译器会自动推断其类型。在上面的例子中，编译器推断出 `myVariable` 是一个整数类型，因为它的初始值是整数。

如果初始值没有提供足够的信息（或者没有初始值），那你需要在变量后面声明类型，用冒号分割。

```swift
let implicitInteger = 70
let implicitDouble = 70.0
let explicitDouble: Double = 70
```

值永远不会被隐式转换为其他类型。如果你需要把一个值转换成其他类型，请显式转换。

```swift
let label = "The width is "
let width = 94
let widthLabel = label + String(width)
```

有一种更简单的把值转换成字符串的方法：把值写到括号中，并且在括号之前写一个反斜杠（\）。例如：

```swift
let apples = 3
let oranges = 5
let appleSummary = "I have \(apples) apples."
let fruitSummary = "I have \(apples + oranges) pieces of fruit."
```

使用三个双引号（"""）来包含多行字符串内容。每行行首的缩进会被去除，只要和结尾引号的缩进相匹配。举个例子：

```swift
let quotation = """
I said "I have \(apples) apples."
And then I said "I have \(apples + oranges) pieces of fruit."
"""
```

使用方括号 `[]` 来创建数组和字典，并使用下标或者键（key）来访问元素。最后一个元素后面允许有个逗号。

```swift
var shoppingList = ["catfish", "water", "tulips", "blue paint"]
shoppingList[1] = "bottle of water"

var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
]
occupations["Jayne"] = "Public Relations"
```

数组在添加元素时会自动变大。

```swift
shoppingList.append("blue paint")
print(shoppingList)
```

使用初始化语法来创建一个空数组或者空字典。

```swift
let emptyArray: [String] = []
let emptyDictionary: [String: Float] = [:]
```

如果类型信息可以被推断出来，你可以用 [] 和 [:] 来创建空数组和空字典——比如，在给变量赋新值或者给函数传参数的时候。

```swift
shoppingList = []
occupations = [:]
```

## 控制流

使用 `if` 和 `switch` 来进行条件操作，使用 `for-in`、`while` 和 `repeat-while` 来进行循环。包裹条件和循环变量的括号可以省略，但是语句体的大括号是必须的。

```swift
let individualScores = [75, 43, 103, 87, 12]
var teamScore = 0
for score in individualScores {
    if score > 50 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}
print(teamScore)
```

在 `if` 语句中，条件必须是一个布尔表达式——这意味着像 `if score { ... }` 这样的代码将报错，而不会隐形地与 0 做对比。

你可以一起使用 `if` 和 `let` 一起来处理值缺失的情况。这些值可由可选值来代表。一个可选的值是一个具体的值或者是 `nil` 以表示值缺失。在类型后面加一个问号（?）来标记这个变量的值是可选的。

```swift
var optionalString: String? = "Hello"
print(optionalString == nil)

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"
if let name = optionalName {
    greeting = "Hello, \(name)"
}
```

如果变量的可选值是 `nil`，条件会判断为 `false`，大括号中的代码会被跳过。如果不是 `nil`，会将值解包并赋给 `let` 后面的常量，这样代码块中就可以使用这个值了。

另一种处理可选值的方法是通过使用 `??` 操作符来提供一个默认值。如果可选值缺失的话，可以使用默认值来代替。

```swift
let nickname: String? = nil
let fullName: String = "John Appleseed"
let informalGreeting = "Hi \(nickname ?? fullName)"
```

你还可以使用较短的代码解包一个值，并且对该被包装值使用相同的名称。

```swift
if let nickname {
    print("Hey, \(nickname)")
}
```

`switch` 支持任意类型的数据以及各种比较操作——不仅仅是整数以及测试相等。

```swift
let vegetable = "red pepper"
switch vegetable {
case "celery":
    print("Add some raisins and make ants on a log.")
case "cucumber", "watercress":
    print("That would make a good tea sandwich.")
case let x where x.hasSuffix("pepper"):
    print("Is it a spicy \(x)?")
default:
    print("Everything tastes good in soup.")
}
```

注意 `let` 在上述例子的等式中是如何使用的，它将匹配等式的值赋给常量 `x`。

运行 `switch` 中匹配到的 `case` 语句之后，程序会退出 `switch` 语句，并不会继续向下运行，所以不需要在每个子句结尾写 `break`。

你可以使用 `for-in` 来遍历字典，需要一对儿变量来表示每个键值对。字典是一个无序的集合，所以他们的键和值以任意顺序迭代结束。

```swift
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
for (_, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)
// 输出 "25"
```

使用 `while` 来重复运行一段代码直到条件改变。循环条件也可以在结尾，保证能至少循环一次。

```swift
var n = 2
while n < 100 {
    n *= 2
}
print(n)

var m = 2
repeat {
    m *= 2
} while m < 100
print(m)
```

你可以在循环中使用 `..<` 来表示下标范围。

```swift
var total = 0
for i in 0..<4 {
    total += i
}
print(total)
```

使用 `..<` 创建的范围不包含上界，如果想包含的话需要使用 `...`。

## 函数和闭包

使用 `func` 来声明一个函数，使用名字和参数来调用函数。使用 `->` 来指定函数返回值的类型。

```swift
func greet(person: String, day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet(person: "Bob", day: "Tuesday")
```

默认情况下，函数使用它们的参数名称作为它们参数的标签，**在参数名称前可以自定义参数标签**，或者使用 `_` 表示不使用参数标签。

```swift
func greet(_ person: String, on day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet("John", on: "Wednesday")
```

使用元组来生成复合值，比如让一个函数返回多个值。该元组的元素可以用名称或数字来获取。

```swift
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0

    for score in scores {
        if score > max {
            max = score
        } else if score < min {
            min = score
        }
        sum += score
    }

    return (min, max, sum)
}
let statistics = calculateStatistics(scores:[5, 3, 100, 3, 9])
print(statistics.sum)
print(statistics.2)
```

**函数可以嵌套**。被嵌套的函数可以访问外侧函数的变量，你可以使用嵌套函数来重构一个太长或者太复杂的函数。

```swift
func returnFifteen() -> Int {
    var y = 10
    func add() {
        y += 5
    }
    add()
    return y
}
returnFifteen()
```

**函数是第一等类型**，这意味着**函数可以作为另一个函数的返回值**。

```swift
func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
let increment = makeIncrementer()
increment(7)
```

**函数也可以当做参数传入另一个函数**。

```swift
func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
func lessThanTen(number: Int) -> Bool {
    return number < 10
}
var numbers = [20, 19, 7, 12]
hasAnyMatches(list: numbers, condition: lessThanTen)
```

函数实际上是一种特殊的闭包：**它是一段能之后被调取的代码**。闭包中的代码能访问闭包作用域中的变量和函数，即使闭包是在一个不同的作用域被执行的——你已经在嵌套函数的例子中看过了。

你可以使用 `{}` 来创建一个匿名闭包。使用 `in` 将参数和返回值类型的声明与闭包函数体进行分离。

```swift
numbers.map({ (number: Int) -> Int in
    let result = 3 * number
    return result
})
```

有很多种创建更简洁的闭包的方法。如果一个闭包的类型已知，比如作为一个代理的回调，你可以忽略参数，返回值，甚至两个都忽略。**单个语句闭包会把它语句的值当做结果返回**。

```swift
let mappedNumbers = numbers.map({ number in 3 * number })
print(mappedNumbers)
```

你可以通过参数位置而不是参数名字来引用参数——这个方法在非常短的闭包中非常有用。当一个闭包作为最后一个参数传给一个函数的时候，它可以直接跟在圆括号后面。当一个闭包是传给函数的唯一参数，你可以完全忽略圆括号。

```swift
let sortedNumbers = numbers.sorted { $0 > $1 }
print(sortedNumbers)
```

## 对象和类

使用 `class` 和类名来创建一个类。类中属性的声明和常量、变量声明一样，唯一的区别就是它们的上下文是类。同样，方法和函数声明也一样。

```swift
class Shape {
    var numberOfSides = 0
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}
```

要创建一个类的实例，在类名后面加上括号。使用点语法来访问实例的属性和方法。

```swift
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```

这个版本的 `Shape` 类缺少了一些重要的东西：一个构造函数来初始化类实例。使用 `init` 来创建一个构造器。

```swift
class NamedShape {
    var numberOfSides: Int = 0
    var name: String

    init(name: String) {
        self.name = name
    }

    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}
```

注意 `self` 被用来区别实例变量 `name` 和构造器的参数 `name`。当你创建实例的时候，像传入函数参数一样给类传入构造器的参数。每个属性都需要赋值——无论是通过声明（就像 `numberOfSides`）还是通过构造器（就像 `name`）。

如果你需要在对象释放之前进行一些清理工作，使用 `deinit` 创建一个析构函数。

子类的定义方法是在它们的类名后面加上父类的名字，用冒号分割。创建类的时候并不需要一个标准的根类，所以你可以根据需要添加或者忽略父类。

子类如果要重写父类的方法的话，需要用 `override` 标记——如果没有添加 `override` 就重写父类方法的话编译器会报错。编译器同样会检测 `override` 标记的方法是否确实在父类中。

```swift
class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }

    func area() ->  Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()
```

除了简单的存储属性，还有使用 `getter` 和 `setter` 的计算属性。

```swift
class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 3
    }

    var perimeter: Double {
        get {
            return 3.0 * sideLength
        }
        set {
            sideLength = newValue / 3.0
        }
    }

    override func simpleDescription() -> String {
        return "An equilateral triangle with sides of length \(sideLength)."
    }
}
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
print(triangle.perimeter)
triangle.perimeter = 9.9
print(triangle.sideLength)
```

在 `perimeter` 的 `setter` 中，新值的名字是 `newValue`。你可以在 `set` 之后的圆括号中显式地设置一个名字。

注意 `EquilateralTriangle` 类的构造器执行了三步：

1. 设置子类声明的属性值。
2. 调用父类的构造器。
3. 改变父类定义的属性值。其他的工作比如调用方法、`getters` 和 `setters` 也可以在这个阶段完成。

如果你不需要计算属性，但是仍然需要在设置一个新值之前或者之后运行代码，使用 `willSet` 和 `didSet`。写入的代码会在属性值发生改变时调用，但不包含构造器中发生值改变的情况。比如，下面的类确保三角形的边长总是和正方形的边长相同。

```swift
class TriangleAndSquare {
    var triangle: EquilateralTriangle {
        willSet {
            square.sideLength = newValue.sideLength
        }
    }
    var square: Square {
        willSet {
            triangle.sideLength = newValue.sideLength
        }
    }
    init(size: Double, name: String) {
        square = Square(sideLength: size, name: name)
        triangle = EquilateralTriangle(sideLength: size, name: name)
    }
}
var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
print(triangleAndSquare.square.sideLength)
print(triangleAndSquare.triangle.sideLength)
triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
print(triangleAndSquare.triangle.sideLength)
```

处理变量的可选值时，你可以在操作（比如方法、属性和子脚本）之前加 `?`。如果 `?` 之前的值是 `nil`，`?` 后面的东西都会被忽略，并且整个表达式返回 `nil`。否则，可选值会被解包，之后的所有代码都会按照解包后的值运行。在这两种情况下，整个表达式的值也是一个可选值。

```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
let sideLength = optionalSquare?.sideLength
```

## 枚举和结构体

## 并发性

## 协议和扩展

## 错误处理

## 泛型
