import React, { useState } from 'react';

function AddTask({ onAddTask }) {
    const [newTaskText, setNewTaskText] = useState('');
  
    const handleAddTask = () => {
      onAddTask(newTaskText);
      setNewTaskText(''); // Clear the input field after adding the task
    };
  
    return (
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    );
  }
  
  export default AddTask;