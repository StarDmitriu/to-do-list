import React from 'react'
import './Task.css'

const Task = ({ task, deleteTask }) => {
	return (
      <li className='item' key={task.id} style={{ whiteSpace: 'pre-line' }}>
        <span>{task.text}</span>
        <button className='deleteButton' onClick={() => deleteTask(task.id)} >
          Удалить задачу
        </button>
      </li>
	)
}

export default Task
