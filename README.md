# Todo list

A minimal, keyboard-friendly todo app built with **React** and **Vite**.
Day 1 of my build-and-learn series.

## Features

- Add, edit, complete and delete tasks
- Filter by All / Open / Done
- Progress bar for the day
- Saves to localStorage, so tasks survive a refresh
- Light & dark mode, responsive, accessible

## What I learned

- Components and props
- `useState`, `useEffect`, `useRef`
- Controlled inputs
- Rendering lists with keys
- Lifting state up
- Writing a custom hook (`useLocalStorage`)

## Run locally

```bash
npm install
npm run dev
```

## Structure

```
src/
├── App.jsx                 # owns state and actions
├── hooks/useLocalStorage.js
└── components/
    ├── TodoForm.jsx        # controlled input
    ├── FilterBar.jsx
    ├── TodoList.jsx        # renders the list
    └── TodoItem.jsx        # one task, inline editing
```
