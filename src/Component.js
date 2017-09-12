/**
 * Created by apple on 2017/7/20.
 */
import render from './render'
import { getDOM } from './util'

export default class Component {
    constructor(props) {
        this.props = props
    }

    setState(state) {
        setTimeout(() => {
            let shoudUpdate
            if(this.shouldComponentUpdate) {
                shoudUpdate = this.shouldComponentUpdate(this.props, state)
            } else {
                shoudUpdate = true
            }

            shoudUpdate && this.componentWillUpdate && this.componentWillUpdate(this.props, state)
            this.state = state

            if (!shoudUpdate) {
                return // do nothing just return
            }

            const vnode = this.render()
            let olddom = getDOM(this)
            render(vnode, olddom.parentNode, this, this.__rendered)
            this.componentDidUpdate && this.componentDidUpdate()
        }, 0)
    }
}
