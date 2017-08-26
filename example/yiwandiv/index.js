/**
 * Created by apple on 2017/8/21.
 */
import render from '../../src/render'
import Component from './Component'  // 由于Component 是es6写法的class， 放在项目外。导入babel不会处理
import createElement from '../../src/createElement'

class App extends Component {
    constructor(props) {
        super(props)
    }

    getDivs() {
        let result = []
        for(let i = 0; i < 10000; i++) {
            result.push(<div>{i}</div>)
        }
        return result
    }

    render() {
        let divs = this.getDivs()
        console.log("xx:", divs)


        return (
            <div
                width={100}>
                <a  onClick={e => {
                    this.setState({})
                }}>click me</a>
                {this.getDivs()}
            </div>
        )
    }
}

render(<App/>, document.getElementById("root"))
