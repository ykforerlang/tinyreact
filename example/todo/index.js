/**
 * Created by apple on 2017/8/21.
 */
import Tinyreact, { createElement, Component } from 'tinyreact'

import HeaderInput from './app/HeaderInput'
import TaskList from './app/TaskList'
import Footer from './app/Footer'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    value: "init task",
                    status: "done"
                }
            ],
            filter:'all'
        }
    }

    addTask(value) {
        const list = this.state.list
        list.push({
            value,
            status: 'undo'
        })
        this.setState({
            list: list
        })
    }

    changeStatus(index) {
        const list = this.state.list
        list[index].status = (list[index].status === 'undo' ? 'done' : 'undo')
        this.setState({
            list: list
        })
    }

    filterStatus(filter) {
        this.setState({
            filter
        })
    }

    render() {
        let list
        if(this.state.filter === "all") {
            list = this.state.list
        } else {
            list = this.state.list.filter(element => (element.status === this.state.filter))
        }

        return (
            <div>
                <HeaderInput addTask={this.addTask.bind(this)}/>
                <TaskList
                    list={list}
                    changeStatus={this.changeStatus.bind(this)}
                />
                <Footer
                    filterStatus={this.filterStatus.bind(this)}
                />
            </div>
        )
    }
}

Tinyreact.render(<App/>, document.getElementById("root"))