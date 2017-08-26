# 从0实现一个tiny react（二）
考虑一下下面的这个例子: 
```javascript 1.7
class AppWithNoVDOM extends Component {
    constructor(props) {
        super(props)
    }

    testApp3() {
        let result = []
        for(let i = 0; i < 10000 ; i++) {
            result.push(<div>{i}</div>)
        }
        return result
    }

    render() {
        return (
            <div
                width={100}>
                <a  onClick={e => {
                    this.setState({})
                }}>click me</a>
                {this.testApp3()}
            </div>
        )
    }
}
```
