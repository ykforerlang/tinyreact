/**
 * Created by apple on 2017/8/21.
 */

import renderVDOM from '../../src/renderVDOM'
import createElement from '../../src/createElement'


class Component{}

class Grandson extends Component {
    render() {
        return <div>i am grandson</div>  // React.createElement('div', null, "i am grandson")
    }
}
class Son extends Component {
    render() {
        return <Grandson/> // React.createElement(Grandson)
    }
}
class Father extends Component {
    render() {
        return <Son/> // React.createElement(Son)
    }
}

const vv = renderVDOM(<Father/>)
console.log("vv:", vv)
