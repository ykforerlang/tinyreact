import render from '../../src/render'
import Component from './Component'  // 由于Component 是es6写法的class， 放在项目外。导入babel不会处理
import createElement from '../../src/createElement'
import RenderedHelper from './RenderedHelper'

class TestAppA extends Component {
    constructor(props) {
        super(props)
        console.log("TestAppA constructor")
    }

    componentWillMount() {
        console.log("TestAppA componentWillMount")
    }

    componentDidMount() {
        console.log("TestAppA componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("TestAppA componentWillReceiveProps")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TestAppA shouldComponentUpdate", nextProps, nextState)
        return true
    }

    componentWillUpdate() {
        console.log("TestAppA componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("TestAppA componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("TestAppA componentWillUnmount")
    }



    render() {
        console.log("TestAppA render...")
        return (
            <div>TestAppA</div>
        )
    }
}

class TestAppB extends Component {
    constructor(props) {
        super(props)
        console.log("TestAppB constructor")
    }

    componentWillMount() {
        console.log("TestAppB componentWillMount")
    }

    componentDidMount() {
        console.log("TestAppB componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("TestAppB componentWillReceiveProps")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TestAppB shouldComponentUpdate", nextProps, nextState)
        return true
    }

    componentWillUpdate() {
        console.log("TestAppB componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("TestAppB componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("TestAppB componentWillUnmount")
    }



    render() {
        console.log("TestAppB render...")
        return (
            <div>TestAppB</div>
        )
    }
}

class TestAppC extends Component {
    constructor(props) {
        super(props)
        console.log("TestAppC constructor")
    }

    componentWillMount() {
        console.log("TestAppC componentWillMount")
    }

    componentDidMount() {
        console.log("TestAppC componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("TestAppC componentWillReceiveProps")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TestAppC shouldComponentUpdate", nextProps, nextState)
        return true
    }

    componentWillUpdate() {
        console.log("TestAppC componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("TestAppC componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("TestAppC componentWillUnmount")
    }



    render() {
        console.log("TestAppC render...")
        return (
            <div>TestAppC</div>
        )
    }
}

/// app1

export default class ComplexComp extends Component {
    render() {
        return (
            <div onClick={e => this.setState({})}>
                <div>
                    <div>
                        <TestAppA/>
                    </div>
                    <TestAppB/>
                </div>
                <TestAppC/>
            </div>
        )
    }
}