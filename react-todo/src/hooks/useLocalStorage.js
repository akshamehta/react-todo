import { useState, useEffect } from "react";

/**
 * A CUSTOM HOOK.
 * It works exactly like useState, but it also saves the value in the
 * browser's localStorage, so your todos survive a page refresh.
 *
 * Rule: any function that uses other hooks must start with "use".
 */
export function useLocalStorage(key, initialValue) {
  // useState can take a function. React runs it only once, on the first render.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // useEffect runs AFTER React updates the screen.
  // The array [key, value] means: "run this again only when key or value changes."
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked. The app still works, it just won't save.
    }
  }, [key, value]);

  return [value, setValue];
}
