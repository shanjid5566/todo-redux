import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todos/todoSlice";
import preferencesReducer from "./features/preferences/preferences";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

// Load todos and preferences from localStorage
const loadState = () => {
  try {
    const todosSerialized = localStorage.getItem("todos");
    const prefsSerialized = localStorage.getItem("preferences");

    let preloaded = {};

    if (todosSerialized) {
      const todos = JSON.parse(todosSerialized);
      // Ensure every todo has a serial. If not, assign serials based on order.
      let maxSerial = todos.reduce((m, t) => Math.max(m, t.serial ?? 0), 0);
      const migrated = todos.map((t) => {
        if (t.serial == null) {
          maxSerial += 1;
          return { ...t, serial: maxSerial };
        }
        return t;
      });
      preloaded.todos = migrated;
    }

    if (prefsSerialized) {
      try {
        const preferences = JSON.parse(prefsSerialized);
        preloaded.preferences = preferences;
      } catch {
        // ignore bad preferences in localStorage
      }
    }

    return Object.keys(preloaded).length ? preloaded : undefined;
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
    return undefined;
  }
};

// Save todos and preferences to localStorage
const saveState = (state) => {
  try {
    if (state.todos !== undefined) {
      const serialized = JSON.stringify(state.todos);
      localStorage.setItem("todos", serialized);
    }
    if (state.preferences !== undefined) {
      const serializedPrefs = JSON.stringify(state.preferences);
      localStorage.setItem("preferences", serializedPrefs);
    }
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
};

const preloadedState = loadState();
const logger = createLogger();
const store = configureStore({
  reducer: {
    todos: todoReducer,
    preferences: preferencesReducer,
  },

  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

// Subscribe to store changes and persist todos
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
