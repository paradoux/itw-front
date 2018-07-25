import React from 'react'
import axios from 'axios'
import uuidv4 from 'uuid/v4'

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        }
    }

    onTitleChange = (e) => {
        let title = e.target.value
        this.setState({ title })
    }

    onDescriptionChange = (e) => {
        let description = e.target.value
        this.setState({ description })
    }

    taskBuilder = () => { //Create a new task on the frontend ready to be saved in the DB (without having to wait for Mongo to send back a new task)
        let { title, description } = this.state
        let _id = uuidv4()  // Creates a new _id for the task 
        let created_at = new Date(Date.now())
        let phase = 'flowcharts'    //Default status of the new task
        return { title, description, phase, _id, created_at }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var task = this.taskBuilder() // Returns the new task
        if ((task.title.match(/\S/) !== null && task.description.match(/\S/) !== null)) {  // Check if inputs are not empty
            axios.post('/new', { task })  // Post the new task to the DB
            this.props.onProjectCreation(task)  // Send the new task to the App Component to be stored in App state and finally sent to Phase component
            this.setState({ title: '', description: '' }) // Empty the input field after task creation
        }
        else {
            return alert("Sorry this field can't be empty !")
        }
    }

    render() {
        return (
            <div className="form-card">
                <h3 className="form-card-title">New Project</h3>
                <form className="form-form-card" action="" onSubmit={this.handleSubmit}> {/* Send the data to handleSubmit  */}
                    <label className="label-title-form-card" htmlFor="input-title-form-card">
                        <input id="input-title-form-card" type="text" placeholder="Project Title" autoComplete="off" value={this.state.title} onChange={this.onTitleChange} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Project Title"} />
                    </label>
                    <label className="label-description-form-card" htmlFor="input-description-form-card">
                        <input id="input-description-form-card" type="text" placeholder="Project Description" autoComplete="off" value={this.state.description} onChange={this.onDescriptionChange} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Project Description"} />
                    </label>
                    <input className="submit-form-card" type="submit" value="Add project +" />
                </form>
            </div>
        )
    }

}

export default Form