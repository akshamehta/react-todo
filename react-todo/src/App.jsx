import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

/**
 * App is the PARENT component.
 * It OWNS the data (state). Child components receive data through PROPS
 * and ask App to change things by calling functions App gives them.
 * This pattern is called "lifting state up".
 */
export default function App() {
  // State #1: the list of todos (saved to localStorage by our custom hook).
  const [todos, setTodos] = useLocalStorage("todos", []);

  // State #2: which filter is active. Not saved, so it resets on refresh.
  const [filter, setFilter] = useState("all");

  // ---------- Actions ----------
  // We never change state directly (no todos.push!).
  // We always create a NEW array and hand it to setTodos.

  function addTodo(text) {
    const newTodo = { id: crypto.randomUUID(), text, done: false };
    setTodos([newTodo, ...todos]);
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function editTodo(id, text) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTodos(todos.filter((t) => !t.done));
  }

  // ---------- Derived values ----------
  // These are calculated from state on every render. No extra state needed.
  const doneCount = todos.filter((t) => t.done).length;
  const leftCount = todos.length - doneCount;
  const progress = todos.length ? (doneCount / todos.length) * 100 : 0;

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = now.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  // ---------- What appears on screen (JSX) ----------
  return (
    <main className="app">
      <header className="header">
        <h1 className="date">{weekday}</h1>
        <p className="summary">
          {monthDay}.{" "}
          {todos.length === 0
            ? "Nothing planned yet."
            : leftCount === 0
            ? "All done. Nice work."
            : `${leftCount} ${leftCount === 1 ? "task" : "tasks"} left`}
        </p>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Passing a function as a prop lets the child talk back to the parent. */}
      <TodoForm onAdd={addTodo} />

      {todos.length > 0 && (
        <FilterBar
          filter={filter}
          onChange={setFilter}
          doneCount={doneCount}
          onClearDone={clearDone}
        />
      )}

      <TodoList
        todos={visibleTodos}
        filter={filter}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}
