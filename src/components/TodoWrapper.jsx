import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';
import Todo from './Todo';
import axiosInstance from '../utils/axioInstance';

const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axiosInstance.get("/get"); // Hapus "/tasks"
                console.log("Fetched tasks:", response.data.task);
                setTodos(response.data.task);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async (title) => {
        try {
            const response = await axiosInstance.post("/add", { title }); // Hapus "/tasks"
            setTodos([...todos, response.data.task]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axiosInstance.delete(`/delete/${id}`); // Hapus "/tasks"
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleComplete = async (id) => {
        const todo = todos.find((todo) => todo._id === id);
        try {
            const response = await axiosInstance.put(`/update/${id}`, {
                completed: !todo.completed,
            });
            setTodos(
                todos.map((todo) =>
                    todo._id === id ? response.data.updatedTask : todo
                )
            );
        } catch (error) {
            console.error("Error toggling task completion:", error);
        }
    };

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const editTask = async (title, id) => {
        try {
            const response = await axiosInstance.put(`/tasks/edit/${id}`, { title });
            setTodos(
                todos.map((todo) =>
                    todo._id === id
                        ? { ...response.data, isEditing: false } // Perbaiki respons
                        : todo
                )
            );
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };
    

    return (
      <div className='TodoWrapper'>
        <h1>Get Things Done</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo) =>
            todo.isEditing ? (
                <EditTodoForm
                    key={todo._id}
                    task={todo}
                    editTask={editTask}
                    cancelEdit={() => editTodo(todo._id)}
                    editTodo={editTodo} // Oper fungsi editTodo
                />
            ) : (
                <Todo
                    key={todo._id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    toggleComplete={toggleComplete}
                />
            )
        )}
    </div>
);
};

export default TodoWrapper;
