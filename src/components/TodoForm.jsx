import { useState } from "react";

/**
 * A CONTROLLED INPUT: React state is the single source of truth
 * for what's typed in the box.
 */
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed); // tell the parent: "add this"
    setText(""); // clear the box
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="new-todo" className="sr-only">
        New task
      </label>
      <input
        id="new-todo"
        className="form-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs doing?"
        autoComplete="off"
      />
      <button className="form-button" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}
