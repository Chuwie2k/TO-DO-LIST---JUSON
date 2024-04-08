import React, { useState } from "react";
import "./index.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: true },
    { id: 3, name: "Task 3", completed: false },
  ]);

  const [sortBy, setSortBy] = useState("inputOrder");
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "completed") {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    return 0;
  });

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTaskName.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditedTaskName(taskToEdit.name);
  };

  const handleSaveEditedTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: editedTaskName } : task,
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="inputOrder">Input Order</option>
          <option value="name">Alphabetical</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="task-container">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
                <button onClick={() => handleSaveEditedTask(task.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.name}
                </span>
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <button onClick={() => handleTaskDelete(task.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <p>
        You have {totalTasks} {totalTasks === 1 ? "item" : "items"} in your
        list. You have already completed {completedTasks}.{" "}
        {completionPercentage}% completed.
      </p>
    </div>
  );
};

export default TodoList;
