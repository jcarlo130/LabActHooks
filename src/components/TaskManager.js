import React from "react";
import AddTask from "./addTask";
import "./taskManager.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { TaskContext } from "../contexts/TaskContexts";
import { useContext } from "react";

function TaskManager() {
  const { tasks, dispatch } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = useCallback(
    (text) => {
      if (text.trim() === "") return; // Prevent adding empty tasks

      const newTask = {
        id: tasks.length + 1,
        text,
        completed: false,
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
    },
    [tasks, dispatch]
  );

  const updateTask = useCallback(
    (id, text) => {
      dispatch({ type: "UPDATE_TASK", payload: { id, text } });
      setEditingTask(null);
      setEditingText("");
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id) => {
      dispatch({ type: "DELETE_TASK", payload: id });
    },
    [dispatch]
  );

  const toggleTaskCompletion = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TASK", payload: id });
    },
    [dispatch]
  );

  const startEditing = useCallback((task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="all">
      <p>Name a task then click the button to finalize it.</p>
      <section>
        <AddTask onAddTask={addTask} />
      </section>
      <section id="container">
        <h1>Task Manager</h1>
        <div className="navContainer">
          <ul className="navbar">
            <li>
              {" "}
              <button className="listItem" onClick={() => setFilter("all")}>
                All
              </button>
            </li>
            <li>
              {" "}
              <button
                className="listItem"
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </li>
            <li>
              {" "}
              <button
                className="listItem"
                onClick={() => setFilter("incomplete")}
              >
                Incomplete
              </button>
            </li>
          </ul>
        </div>
        <ul className="taskList">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => updateTask(task.id, editingText)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTask(task.id, editingText);
                    }
                  }}
                />
              ) : (
                <>
                  <div className="tasks">
                    <span
                      className="tastText"
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.text}
                    </span>
                    <div className="buttons">
                      <button
                        className="edtBtn"
                        onClick={() => startEditing(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="dltBtn"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="cmpltBtn"
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TaskManager;
