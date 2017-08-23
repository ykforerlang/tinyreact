/**
 * Created by apple on 2017/7/20.
 */
import render from './render'

export default class Component {
    constructor(props) {
        this.props = props
    }

    setState(state) {
        setTimeout(() => {
            this.state = state
            const vnode = this.render()
            let olddom = getDOM(this)
            render(vnode, olddom.parentNode, this, olddom)
        }, 0)
    }
}


function getDOM(comp) {
    let rendered = comp.__rendered
    while (rendered instanceof Component) { //判断对象是否是dom
        rendered = rendered.__rendered
    }
    return rendered
}