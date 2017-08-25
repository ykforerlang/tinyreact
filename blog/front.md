### JS
1. http 状态码？
<br/><br/><br/>
2. 写一下浮动布局， 以及清除浮动的方式
<br/><br/><br/>

3. 执行程序， 输出是什么？
```javascript 1.7
function getA() {
  var a = "Hello World"
  a.name = "js"
  return 
      a + a.name + (0.1 + 0.2 == 0.3)
}
console.log(getA())
```
<br/><br/><br/>
4. 
```javascript 1.7
function P() {
  var name = 'x'
  this.name = 'y'
  this.getName = function() {
      // 1 
  }
}
var r1 = new P().getName()

function Q() {
  var name = 'x'
  this.name = 'y'
  this.getName = h
}
function h() {
     // 2
}
var r2 = new Q().getName()
```
如果 1, 2处 是return name。  r1, r2 分别是什么
<br/><br/><br/>
如果 1，2处 是return this.name。  r1, r2 分别是什么
<br/><br/><br/>

5. 
```javascript 1.7
function Father() {
  
}
var father = new Father()
function Son() {
  
}
Son.prototype = father
var son = new Son()
```
画出   Function, Father， Father.prototype, father, Son, Son.prototype, son 的关系
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


### React 相关 (非react技术栈 可以不做)
1. 写出你知道的react生命周期
2. 当 点击div的时候， 会不会触发App的 render ？， 将会调用 SubApp的哪些生命周期？
```jsx harmony
import SubApp ...
class App extends Component {
    render() {
        return (
            <div onClick={e => this.setState({})}>
                <SubApp/>
            </div>
        )
    }
}
```
<br/><br/><br/><br/><br/><br/><br/>

3. 当点击div的时候， 输出是什么
```jsx harmony
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "first"
        }
    }
    handleClick() {
        this.setState({
             text: "second"
        }, () => {
            console.log("hcc", this.state.text)
        })
        console.log("hc:", this.state.text)
    }
    render() {
        console.log("render:", this.state.text)
        return (
            <div onClick={this.handleClick.bind(this)}>{this.state.text}</div>
        )
    }
}
```
<br/><br/><br/><br/><br/><br/>


4. React 中 key 属性 的作用是什么？
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>






5. 谈一下多 virtual-dom的理解,
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>





6. 谈一下 redux核心概念
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
