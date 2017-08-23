/**
 * Created by apple on 2017/8/21.
 */
import render from '../../src/render'
import Component from './Component'  // 由于Component 是es6写法的class， 放在项目外。导入babel不会处理
import createElement from '../../src/createElement'

class Dog extends Component {
    render() {
        return (
            <div style={{ color: this.props.color }}>i am a {this.props.color} dog, click me to change color</div>
        )
    }
}

const colorArray = ['red', 'blue', 'yellow', 'black', 'green']
class PS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'grey'
        }
    }
    handleClick() {
        this.setState({
            color: colorArray[parseInt(Math.random() * 5)]
        })
    }
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                <Dog color={ this.state.color }/>
            </div>
        )
    }
}

render(<PS/>, document.getElementById("root"))
