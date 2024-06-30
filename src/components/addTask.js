import React, { useState, useRef, useEffect } from "react";
import "./addTask.css";

function AddTask({ onAddTask }) {
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return; // Prevent adding empty tasks

    onAddTask(newTaskText);
    setNewTaskText(""); // Clear the input field after adding the task
    inputRef.current.focus(); // Focus the input field after adding the task
  };

  useEffect(() => {
    inputRef.current.focus(); // Focus the input field on component mount
  }, []);

  return (
    <div className="container">
      <input
        id="taskText"
        ref={inputRef}
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="New task"
      />
      <button id="taskBtn" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
