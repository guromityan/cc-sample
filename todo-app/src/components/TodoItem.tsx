import { useState, useEffect, useRef } from 'react';
import type { Todo } from '../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(todo.text);
      inputRef.current?.focus();
    }
  }, [isEditing, todo.text]);

  function commitEdit() {
    onEdit(todo.id, editValue);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''} ${isEditing ? styles.editing : ''}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
        />
      ) : (
        <>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <label
            className={styles.label}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </label>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(todo.id)}
            aria-label="Delete"
          >
            ×
          </button>
        </>
      )}
    </li>
  );
}
