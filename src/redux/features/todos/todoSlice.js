import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
});
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
      const maxSerial = state.reduce((m, t) => Math.max(m, t.serial ?? 0), 0);
      const newSerial = maxSerial + 1;
      state.push({
        id: Date.now(),
        serial: newSerial,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
