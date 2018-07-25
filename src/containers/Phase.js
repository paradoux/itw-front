import React, { Component } from 'react';
import axios from 'axios'
import Tasks from '../containers/Tasks'

class Phase extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: []

        }
    }

    componentDidMount = () => {
        axios.get('/projects').then(res => {
            const tasks = res.data;
            this.setState({ tasks: tasks })
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.newTasks !== prevProps.newTasks) {
            this.setState({ ...this.state, tasks: [...this.state.tasks, ...this.props.newTasks] })
        }
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e, phase) => {
        let title = e.dataTransfer.getData("text/plain")
        let tasks = [...this.state.tasks]
        tasks = tasks.filter((task) => {
            if (task.title === title) {
                task.phase = phase
                this.updateTask(task._id, phase)
            }
            return task
        })
        this.setState({ ...this.state, tasks })
    }

    updateTask = (_id, phase) => {
        axios.put('/update', { _id, phase })
    }

    handleProjectDelete = (id) => {
        this.setState({
            tasks: this.state.tasks.filter(task => {
                return (task._id !== id)
            })
        })
    }

    render() {

        var phases = {
            flowcharts: [],
            wireframes: [],
            prototype: [],
            development: [],
            test: [],
            launch: []
        }

        this.state.tasks.map(task => {
            return phases[task.phase].push(task)
        })

        return Object.keys(phases).map(phase => {
            return (
                <div className="col-md-2">
                    <div className="phase"
                        key={phase}
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, phase)}
                    >
                        <Tasks onProjectDelete={(id) => this.handleProjectDelete(id)} tasks={this.state.tasks.filter(task => {
                            return (task.phase === phase)
                        })} />
                    </div>
                </div>
            );
        })
    }
}

export default Phase;
