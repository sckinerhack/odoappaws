import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Load todos from localStorage on mount
  useEffect(() => {
    if (!currentUser) return;

    const storageKey = `todos_${currentUser.userId}`;
    const savedTodos = localStorage.getItem(storageKey);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }
  }, [currentUser]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!currentUser) return;

    const storageKey = `todos_${currentUser.userId}`;
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, currentUser]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setLoading(true);
      const newTodoItem = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        userId: currentUser.userId,
        createdAt: new Date().toISOString(),
      };
      setTodos([newTodoItem, ...todos]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Todo List</h1>
        <div className="user-info">
          <span>{currentUser?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" disabled={loading} className="btn-add">
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="todo-stats">
        <p>Total: {todos.length}</p>
        <p>Completed: {todos.filter((t) => t.completed).length}</p>
        <p>Pending: {todos.filter((t) => !t.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoApp;
