import render from '../../src/render'
import Component from './Component'  // 由于Component 是es6写法的class， 放在项目外。导入babel不会处理
import createElement from '../../src/createElement'
import RenderedHelper from './RenderedHelper'
import ComplexComp from './ComplexComp'

class TestApp extends Component {
    constructor(props) {
        super(props)
        console.log("TestApp constructor")
    }

    componentWillMount() {
        console.log("TestApp componentWillMount")
    }

    componentDidMount() {
        console.log("TestApp componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("TestApp componentWillReceiveProps")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TestApp shouldComponentUpdate", nextProps, nextState)
        return true
    }

    componentWillUpdate() {
        console.log("TestApp componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("TestApp componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("TestApp componentWillUnmount")
    }



    render() {
        console.log("TestApp render...")
        return (
            <div>TestApp</div>
        )
    }
}

/// app1

class App1 extends Component {
    render() {
        return (
            <div onClick={e => {
                this.setState({})
            }}>
                <TestApp/>
            </div>
        )
    }
}



const root = document.getElementById("root")
root.__rendered = new RenderedHelper()
render(<ComplexComp/>, root)