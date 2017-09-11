import render from '../../lib/render'
import Component from '../../lib/Component'
import createElement from '../../lib/createElement'
import RenderedHelper from '../../lib/RenderedHelper'
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