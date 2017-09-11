/**
 * Created by apple on 2017/8/21.
 */
import render from '../../lib/render'
import Component from '../../lib/Component'
import createElement from '../../lib/createElement'

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
