import React from 'react'
import axios from 'axios'


const Task = (props) => {
    var { task } = props

    this.handleDelete = (_id) => {
        axios.delete('/delete', { data: { _id } }) // Send a delete request to the DB with the id of the task to be deleted
        props.onProjectDelete(_id)  //Lift the id of the task to be deleted to the Task component and Phase component to update the state 
    }

    this.onDragStart = (e, title) => {
        e.dataTransfer.setData("text/plain", title) //Stores the title of the selected task in the dataTransfer
    }

    return (
        <div className="task-card"
            draggable
            onDragStart={(e) => { this.onDragStart(e, task.title) }}
        >
            <div className="task-card-banner">
                <h3 className="task-title">{task.title}</h3>
                <button className="task-delete" onClick={() => this.handleDelete(task._id)}>X</button> {/* Send the selected task's id to the handleDelete function */}
            </div>
            <p className="task-description">{task.description}</p>
        </div>
    )
}

export default Task