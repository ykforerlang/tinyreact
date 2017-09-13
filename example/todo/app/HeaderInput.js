/**
 * Created by apple on 2017/9/13.
 */
import  { createElement, Component } from 'tinyreact'

export default  class HeaderInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleBlur(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleClick() {
        this.props.addTask(this.state.value)
        this.setState({
            value:''
        })
    }

    render() {
        return (
            <div>
                <input value={this.state.value}
                       onBlur={this.handleBlur.bind(this)}
                />
                <button onClick={this.handleClick.bind(this)}>增加</button>
            </div>
        )
    }
}