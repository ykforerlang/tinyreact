# tinyreact
tinyreact is tiny, simple and clear react-like lib. It will help you understand react better.

so first, let's play [todoList](https://ykforerlang.github.io/todo/index.html) written by tinyreact

### Install
```
npm install tinyreact --save
```

### Getting Started
let's write 'Hello World':
1. .babelrc 
```jsx harmony
{
  "presets": [
    "es2015"
  ],
  "plugins": [
    ["transform-react-jsx", {
      "pragma":  "createElement"// default pragma is React.createElement, we should change!
    }]
  ]
}
```
2. npm install tinyreact --save

3. write your code like React
```jsx harmony
import Tinyreact, { createElement, Component } from 'tinyreact'

class HelloWorld extends Component {
    render() {
        return <div style={{ color: 'red' }}>Hello World</div>
    }
}

Tinyreact.render(<HelloWorld/>, document.getElementById("root"))
```

### Example
 1. [helloword](https://github.com/ykforerlang/tinyreact/tree/master/example/helloworld) 
 2. [lifecycle](https://github.com/ykforerlang/tinyreact/tree/master/example/lifecycle)
 3. [yiwandiv](https://github.com/ykforerlang/tinyreact/tree/master/example/yiwandiv)
 4. [TodoList](https://github.com/ykforerlang/todo)

### Blog

1. [从0实现一个tiny react(一)](https://github.com/ykforerlang/tinyreact/blob/master/blog/%E4%BB%8E0%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAtiny%20react(%E4%B8%80).md)
2. [从0实现一个tiny react(二) virtual-dom](https://github.com/ykforerlang/tinyreact/blob/master/blog/%E4%BB%8E0%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAtiny%20react(%E4%BA%8C).md) 
3. [从0实现一个tiny react(三) 生命周期](https://github.com/ykforerlang/tinyreact/blob/master/blog/%E4%BB%8E0%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAtiny%20react(%E4%B8%89).md) 
