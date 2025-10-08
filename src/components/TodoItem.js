import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      
      {isEditing ? (
        <div className="editing">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>💾</button>
          <button onClick={handleCancel}>❌</button>
        </div>
      ) : (
        <div className="view">
          <span onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => onDelete(todo.id)}>🗑️</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;