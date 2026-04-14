import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import styles from './App.module.css';

function App() {
  const {
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
  } = useTodos();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>todos</h1>
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {todos.length > 0 && (
          <Filter
            current={filter}
            activeCount={activeCount}
            totalCount={todos.length}
            onFilter={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
