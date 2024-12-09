import React, { useState } from 'react';

const EditTodoForm = ({ task, editTask, cancelEdit, editTodo }) => {
    const [title, setTitle] = useState(task.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editTask) {
            editTask(title, task._id); // Memanggil fungsi untuk update
        } else {
            console.error('editTask is not defined');
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className='EditTodoForm'>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='todo-input'
            />
            <button type='submit' className='todo-btn'>Save</button>
            <button type='button' className='todo-btn cancel' onClick={cancelEdit}>
                Cancel
            </button>
        </form>
    );
};

export default EditTodoForm;
