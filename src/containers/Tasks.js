import React from 'react'
import Task from '../containers/Task'

const Tasks = (props) => {

    return props.tasks.map(task => {
        return (
            <div key={task._id}>
                {/* Send the handleProjectDelete to Tasks through props  */}
                <Task onProjectDelete={(id) => props.onProjectDelete(id)} task={task} />
            </div>
        )
    })
}

export default Tasks