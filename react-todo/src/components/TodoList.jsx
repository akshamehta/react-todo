import TodoItem from "./TodoItem";

const EMPTY_MESSAGES = {
  all: "Add your first task above.",
  active: "No open tasks. Enjoy the quiet.",
  done: "Nothing finished yet.",
};

export default function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  // CONDITIONAL RENDERING: show a message instead of an empty list.
  if (todos.length === 0) {
    return <p className="empty">{EMPTY_MESSAGES[filter]}</p>;
  }

  // RENDERING A LIST: .map() turns each todo object into a <TodoItem />.
  // Every item needs a unique "key" so React can track it between renders.
  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
