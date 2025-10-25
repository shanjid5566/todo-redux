import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  return response.json();
});
// initialState is an object with todos array, loading and error states
const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Determine the next serial number (max existing serial + 1)
      const maxSerial = state.todos.reduce((m, t) => Math.max(m, t.serial ?? 0), 0);
      const newSerial = maxSerial + 1;
      state.todos.push({
        id: Date.now(),
        serial: newSerial,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      // Filter and update todos array
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      // API থেকে আসা todos গুলোতে serial number এবং text field যোগ করা
      state.todos = action.payload.map((todo, index) => ({
        ...todo,
        serial: index + 1,
        text: todo.title, // API এর 'title' কে 'text' এ convert করছি
      }));
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
