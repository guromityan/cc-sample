import { useState } from 'react';
import styles from './AddTodo.module.css';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="What needs to be done?"
      />
      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={!value.trim()}
      >
        Add
      </button>
    </div>
  );
}
