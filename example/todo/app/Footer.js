/**
 * Created by apple on 2017/9/13.
 */
import  { createElement, Component } from 'tinyreact'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <button onClick={e => this.props.filterStatus('all')}>all</button>
                <button onClick={e => this.props.filterStatus('done')}>done</button>
                <button onClick={e => this.props.filterStatus('undo')}>undo</button>
            </div>
        )
    }
}