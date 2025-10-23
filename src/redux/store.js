import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../redux/features/todos/todoSlice'

export default configureStore({
  reducer: {
    // Add your reducers here
    todos: todoReducer,
  }
})