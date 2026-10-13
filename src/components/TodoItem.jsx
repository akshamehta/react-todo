import { useState, useRef, useEffect } from "react";

/**
 * One row in the list. It has its own small piece of state (isEditing)
 * because no other component needs to know about it.
 */
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  // useRef gives us a direct handle on a real DOM element.
  const inputRef = useRef(null);

  // When we enter edit mode, put the cursor in the input box.
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  function save() {
    const trimmed = draft.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    else setDraft(todo.text); // empty edit? undo it
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      setDraft(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`item ${todo.done ? "is-done" : ""}`}>
      <input
        type="checkbox"
        className="item-check"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.done ? "not done" : "done"}`}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          className="item-edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          aria-label="Edit task"
        />
      ) : (
        <span className="item-text" onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className="item-actions">
        {!isEditing && (
          <button className="icon-button" onClick={() => setIsEditing(true)} aria-label="Edit task">
            ✎
          </button>
        )}
        <button className="icon-button danger" onClick={() => onDelete(todo.id)} aria-label="Delete task">
          ✕
        </button>
      </div>
    </li>
  );
}
