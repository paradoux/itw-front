import React, { Component } from 'react'
import axios from 'axios'

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

    handleSubmit = (e) => {
        e.preventDefault()
        let { title, description } = this.state
        axios.post('/new', { title, description })
    }

    render() {
        return (
            <div className="form">
                <form action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="title">
                        <input type="text" value={this.state.title} onChange={this.onTitleChange} />
                    </label>
                    <label htmlFor="description">
                        <input type="text" value={this.state.description} onChange={this.onDescriptionChange} />
                    </label>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }

}

export default Form