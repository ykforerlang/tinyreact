import Component from '../../lib/Component'
import createElement from '../../lib/createElement'
import RenderedHelper from '../../lib/RenderedHelper'

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


class TestAppD extends Component {
    constructor(props) {
        super(props)
        console.log("TestAppD constructor")
    }

    componentWillMount() {
        console.log("TestAppD componentWillMount")
    }

    componentDidMount() {
        console.log("TestAppD componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("TestAppD componentWillReceiveProps")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TestAppD shouldComponentUpdate", nextProps, nextState)
        return true
    }

    componentWillUpdate() {
        console.log("TestAppD componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("TestAppD componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("TestAppD componentWillUnmount")
    }



    render() {
        console.log("TestAppD render")
        if (this.props.text === "testA") {
            return <TestAppA/>
        } else if (this.props.text === "testB") {
            return <TestAppB/>
        } else {
            return <TestAppC/>
        }
    }
}

/// app1

export default class ComplexComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            odd: false
        }
    }

    render() {
        return (
            <div onClick={e => this.setState({
                odd: !this.state.odd
            })}>
                {this.state.odd ? <TestAppA/> : <TestAppB/>}
                <div>hi2</div>
                <div>hi3</div>
            </div>
        )
    }
}