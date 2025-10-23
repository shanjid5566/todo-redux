import "./App.css";

function App() {
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
            // "disabled" rakha hoyeche karon apni shudhu UI cheyechen
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
            disabled // Functional na
          >
            Add
          </button>
        </div>

        {/* Task List Section */}
        <div className="space-y-3">
          {/* Shudhu UI dekhanor jonno dummy item 1 */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <input
              type="checkbox"
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="ml-3 block text-gray-700 font-medium">
              Go grocery shopping
            </label>
            <button className="text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-lg cursor-pointer transition duration-200">
              remove
            </button>
          </div>
        </div>

        {/* Footer Message (Dummy) */}
        <p className="text-center text-gray-400 text-sm mt-8">
          You have 1 tasks today.
        </p>
      </div>
    </div>
  );
}

export default App;
