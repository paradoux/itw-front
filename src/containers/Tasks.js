import React from 'react'
import Task from '../containers/Task'

class Tasks extends React.Component {

    render() {
        return this.props.tasks.map(task => {
            return (
                <div key={task._id}>
                    <Task onProjectDelete={(id) => this.props.onProjectDelete(id)} task={task} />
                </div>
            )
        })
    }

}

export default Tasks