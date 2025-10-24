import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todos/todoSlice'
import preferencesReducer from './features/preferences/preferences';

// Load todos from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('todos');
    if (serialized === null) return undefined;
    const todos = JSON.parse(serialized);
    // Ensure every todo has a serial. If not, assign serials based on order.
    let maxSerial = todos.reduce((m, t) => Math.max(m, t.serial ?? 0), 0);
    const migrated = todos.map((t) => {
      if (t.serial == null) {
        maxSerial += 1;
        return { ...t, serial: maxSerial };
      }
      return t;
    });
    return { todos: migrated };
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
    preferences: preferencesReducer,
  },
  preloadedState,
});

// Subscribe to store changes and persist todos
store.subscribe(() => {
  saveState(store.getState());
});

export default store;