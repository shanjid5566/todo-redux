import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todos/todoSlice'

// Load todos from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('todos');
    if (serialized === null) return undefined;
    return { todos: JSON.parse(serialized) };
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return undefined;
  }
}

// Save todos to localStorage
const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state.todos);
    localStorage.setItem('todos', serialized);
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState,
});

// Subscribe to store changes and persist todos
store.subscribe(() => {
  saveState(store.getState());
});

export default store;