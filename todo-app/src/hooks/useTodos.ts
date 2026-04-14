import { useState, useEffect, useMemo } from 'react';
import type { Todo, FilterType } from '../types/todo';

const STORAGE_KEY = 'todos';

function loadFromStorage(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  function addTodo(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function editTodo(id: string, newText: string) {
    const trimmed = newText.trim();
    if (!trimmed) {
      deleteTodo(id);
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    activeCount,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
  };
}
