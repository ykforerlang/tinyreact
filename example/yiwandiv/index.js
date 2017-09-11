/**
 * Created by apple on 2017/8/21.
 */
import render from '../../lib/render'
import Component from '../../lib/Component'
import createElement from '../../lib/createElement'



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allTest: this.getTest()
        }

        this.start = 0
        this.end = 10000
    }

    getTest() {
        let result = []
        for(let i = 0; i < 10000; i++) {
            result.push(<div style={{
                width: '30px',
                color: 'red',
                fontSize: '12px',
                fontWeight: 600,
                height: '20px',
                textAlign: 'center',
                margin:'5px',
                padding: '5px',
                border:'1px solid red',
                position: 'relative'
            }} title={i} >{i}</div>)
        }
        return result
    }

    getNowAllTest() {
        this.start = this.start - 1
        return [<div style={{
            width: '30px',
            color: 'red',
            fontSize: '12px',
            fontWeight: 600,
            height: '20px',
            textAlign: 'center',
            margin:'5px',
            padding: '5px',
            border:'1px solid red',
            position: 'relative'
        }} title={this.start} >{this.start}</div>].concat(this.state.allTest)
    }

    getNowAllTest2() {
        this.end = this.end + 1
        return this.state.allTest.concat([<div style={{
            width: '30px',
            color: 'red',
            fontSize: '12px',
            fontWeight: 600,
            height: '20px',
            textAlign: 'center',
            margin:'5px',
            padding: '5px',
            border:'1px solid red',
            position: 'relative'
        }} title={this.end} >{this.end}</div>])
    }

    render() {
        return (
            <div
                width={100}>
                <a  onClick={e => {
                    this.setState({
                        allTest: this.getNowAllTest2()
                    })
                }}>click me</a>
                {this.state.allTest}
            </div>
        )
    }
}

const startTime = new Date().getTime()
render(<App/>, document.getElementById("root"))
console.log("duration:", new Date().getTime() - startTime)