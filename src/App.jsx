import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useState } from "react";
import { addTodo } from "./redux/features/todos/todoSlice";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-100 min-h-screen py-12 ">
      <div className="container mx-auto max-w-lg p-6 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My To-do List
        </h1>

        {/* Input Section */}
        <div className="flex space-x-3 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
            disabled={!newTodo}
            onClick={() => {
              dispatch(addTodo(newTodo));
              setNewTodo("");
            }}
          >
            Add
          </button>
        </div>

        {/* Task List Section */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
              >
                <label
                  className={`ml-3 block font-medium ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {todo.text}
                </label>
                <button className="text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
                  completed
                </button>
                <button className="text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
                  remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
