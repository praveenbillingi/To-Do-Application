import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:8081/api/todos");
    setTodos(res.data);
  };

  // Run once when page loads
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (title.trim() === "") return;

    await axios.post("http://localhost:8081/api/todos", {
      title: title,
      completed: false
    });

    setTitle("");
    fetchTodos();
  };

  // Toggle complete / incomplete
  const toggleComplete = async (todo) => {
    await axios.put(
      `http://localhost:8081/api/todos/${todo.id}`,
      {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      }
    );

    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(
      `http://localhost:8081/api/todos/${id}`
    );

    fetchTodos();
  };

  // Enable edit mode
  const startEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, isEditing: true }
          : todo
      )
    );
  };

  // Save edited todo
  const saveEdit = async (todo) => {
    await axios.put(
      `http://localhost:8081/api/todos/${todo.id}`,
      {
        id: todo.id,
        title: todo.title,
        completed: todo.completed
      }
    );

    fetchTodos();
  };

  // Update title while typing
  const handleEditChange = (id, value) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, title: value }
          : todo
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>

      {/* Add Section */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <hr />

      {/* Todo List */}
      {todos.map(todo => (
        <div key={todo.id} style={{ marginBottom: 10 }}>

          {todo.isEditing ? (
            <>
              <input
                value={todo.title}
                onChange={e =>
                  handleEditChange(todo.id, e.target.value)
                }
              />
              <button onClick={() => saveEdit(todo)}>
                Save
              </button>
            </>
          ) : (
            <>
              <span
                onClick={() => toggleComplete(todo)}
                style={{
                  cursor: "pointer",
                  textDecoration:
                    todo.completed ? "line-through" : "none"
                }}
              >
                {todo.title}
              </span>

              <button onClick={() => startEdit(todo.id)}>
                Edit
              </button>

              <button onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </>
          )}

        </div>
      ))}

    </div>
  );
}

export default App;