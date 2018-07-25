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

    buildTask = () => {
        let { title, description } = this.state
        let _id = uuidv4()
        let created_at = new Date(Date.now())
        let phase = 'flowcharts'
        let task = { title, description, phase, _id, created_at }
        return task
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let task = this.buildTask()
        if (task.title.match(/^[a-z0-9]+$/i) === null || task.description.match(/^[a-z0-9]+$/i) === null) {
            alert("Sorry ! This field can't be empty !")
        } else {
            axios.post('/new', { task })
            this.props.onProjectCreation(task)
            this.setState({ title: '', description: '' })
        }
    }

    render() {
        return (
            <div className="form-card">
                <h3 className="form-card-title">New Project</h3>
                <form className="form-form-card" action="" onSubmit={this.handleSubmit}>
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