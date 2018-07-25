import React from 'react'
import axios from 'axios'


const Task = (props) => {
    var { task } = props

    this.handleDelete = (_id) => {
        axios.delete('/delete', { data: { _id } })
        this.props.onProjectDelete(_id)
    }

    this.onDragStart = (e, title) => {
        e.dataTransfer.setData("text/plain", title)
    }

    return (
        <div className="task-card"
            draggable
            onDragStart={(e) => { this.onDragStart(e, task.title) }}
        >
            <div className="task-card-banner">
                <h3 className="task-title">{task.title}</h3>
                <button className="task-delete" onClick={() => this.handleDelete(task._id)}>X</button>
            </div>
            <p className="task-description">{task.description}</p>
        </div>
    )
}

export default Task