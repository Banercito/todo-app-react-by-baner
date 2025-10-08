import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import '../styles/TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-app">
      <h1>Lista de Tareas</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList 
        todos={todos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

export default TodoApp;