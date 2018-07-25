import React from 'react'
import axios from 'axios'


class Task extends React.Component {

    handleDelete = (_id) => {
        axios.delete('/delete', { data: { _id } })
        this.props.onProjectDelete(_id)
    }

    onDragStart = (e, title) => {
        e.dataTransfer.setData("text/plain", title)
    }

    render() {
        let { task } = this.props
        return (
            <div
                draggable
                onDragStart={(e) => { this.onDragStart(e, task.title) }}
            >
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => this.handleDelete(task._id)}>X</button>
            </div>
        )
    }

}

export default Task