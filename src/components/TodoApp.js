import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import '../styles/TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // CARGAR tareas al iniciar - SOLO UNA VEZ
  useEffect(() => {
    console.log('🔄 Cargando tareas desde localStorage...');
    try {
      const savedTodos = localStorage.getItem('baner-todos-app');
      console.log('📁 Datos encontrados:', savedTodos);
      
      if (savedTodos && savedTodos !== 'undefined') {
        const parsedTodos = JSON.parse(savedTodos);
        console.log('✅ Tareas cargadas:', parsedTodos);
        setTodos(parsedTodos);
      } else {
        console.log('ℹ️ No hay tareas guardadas');
        setTodos([]);
      }
    } catch (error) {
      console.error('❌ Error al cargar tareas:', error);
      setTodos([]);
    }
    setIsLoaded(true);
  }, []);

  // GUARDAR tareas cada vez que cambien
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Guardando tareas en localStorage:', todos);
      try {
        localStorage.setItem('baner-todos-app', JSON.stringify(todos));
        console.log('✅ Tareas guardadas correctamente');
      } catch (error) {
        console.error('❌ Error al guardar tareas:', error);
      }
    }
  }, [todos, isLoaded]);

  const addTodo = (text) => {
    if (text.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    if (newText.trim() === '') return;
    
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Función para limpiar todas las tareas (para testing)
  const clearAllTodos = () => {
    setTodos([]);
    localStorage.removeItem('baner-todos-app');
    console.log('🗑️ Todas las tareas eliminadas');
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

      {/* Botón para limpiar (solo para testing) */}
      {todos.length > 0 && (
        <button 
          className="clear-all-btn" 
          onClick={clearAllTodos}
          style={{
            margin: '10px auto',
            padding: '8px 16px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Limpiar Todas las Tareas
        </button>
      )}
      
      {/* Footer con tu autoría */}
      <footer className="app-footer">
        <p><strong>© Baner Murga {new Date().getFullYear()}. Todos los derechos reservados.</strong></p>
      </footer>
    </div>
  );
};

export default TodoApp;