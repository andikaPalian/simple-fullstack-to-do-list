import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  return (
    <div className='Todo'>
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task._id)}>{task.title}</p>
        <div>
            <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={() => editTodo(task._id)} />
            <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => deleteTodo(task._id)} />
        </div>
    </div>
  )
}

export default Todo