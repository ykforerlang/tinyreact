/**
 * Created by apple on 2017/8/21.
 */

import render from '../../src/render'
import createElement from '../../src/createElement'

class Component{}

class HelloWorld extends Component {
    render() {
        return <div style={{ color: 'red' }}>Hello World</div>
    }
}

render(<HelloWorld/>, document.getElementById("root"))
