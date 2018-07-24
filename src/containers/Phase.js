import React, { Component } from 'react';
import axios from 'axios'

class Phase extends Component {

    state = {
        tasks: []
    }

    componentDidMount = () => {
        axios.get('/projects').then(res => {
            const tasks = res.data;
            this.setState({ tasks: tasks })
        })
    }

    onDragStart = (e, title) => {
        e.dataTransfer.setData("text/plain", title)
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


    handleDelete = (_id) => {
        console.log(_id)
        axios.delete('/delete', { data: { _id } })
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

        this.state.tasks.map((task) => {
            phases[task.phase].push(task)
        })

        return Object.entries(phases).map((entry) => {
            return (
                <div className="col-md-2">
                    <div className="phase"
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, entry[0])}
                    >
                        <h1>{entry[0]}</h1>
                        <div>
                            {entry[1].map((task) => {
                                return (
                                    <div className="task"
                                        onDragStart={(e) => { this.onDragStart(e, task.title) }}
                                        draggable
                                    >
                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>
                                        <button onClick={() => this.handleDelete(task._id)}>X</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        });
    }
}

export default Phase;
