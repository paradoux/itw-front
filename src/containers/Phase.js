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
        axios.get('/projects').then(res => { //After mounting, Get all the tasks from the DB
            const tasks = res.data;
            this.setState({ ...this.state, tasks }) //Send these tasks to the state 
        })
    }

    //When a new task is created, the component receives a new prop from App.   
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.newTasks !== prevProps.newTasks) {
            this.setState({ ...this.state, tasks: [...this.state.tasks, ...this.props.newTasks] })//It updates the Phase's state with a new task and make the component to rerender displaying the new task
        }
    }


    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e, phase) => {
        let title = e.dataTransfer.getData("text/plain")  //Retrieves the task title from the dataTransfer
        let tasks = [...this.state.tasks]
        tasks = tasks.filter((task) => { // Filters the tasks of the state to find the one that has a corresponding title with the task dropped and update its phase 
            if (task.title === title) {
                task.phase = phase
                this.updateTask(task._id, phase) //Sends the id of the task to be updated and its new phase to the updateTask function
            }
            return task
        })
        this.setState({ ...this.state, tasks })
    }

    updateTask = (_id, phase) => {  //Sends an update request to the DB with the _id of the task and its new phase
        axios.put('/update', { _id, phase })
    }

    handleProjectDelete = (id) => { //Retrieve the id of the selected task from the Task component (passing through the onProjectDelete prop of Tasks and Task)
        this.setState({
            tasks: this.state.tasks.filter(task => {    //Filter all the tasks to find the task's id corresponding to the retrieved one and update the state without the deleted task
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

        this.state.tasks.map(task => {  // Take the tasks from the state and push each task into the correct phase
            return phases[task.phase].push(task)
        })

        return Object.keys(phases).map(phase => { //Display all the different phases 
            return (
                <div key={phase} className="col-md-2">
                    <div className="phase"
                        key={phase}
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, phase)} //Send the name of the phase where the task has been dropped 
                    >
                        {/* Send the handle ProjectDelete to Tasks through props  */}
                        <Tasks onProjectDelete={(id) => this.handleProjectDelete(id)} tasks={this.state.tasks.filter(task => { /* For each phase, filters the tasks that have a phase corresponding to the current phase */
                            return (task.phase === phase)
                        })} />
                    </div>
                </div>
            );
        })
    }
}

export default Phase;
