import "./App.css";
import TaskManager from "./components/TaskManager";
import { TaskProvider } from "./contexts/TaskContexts";

function App() {
  return (
    <div className="App">
      <section className="title">
        <h1>To Do List</h1>
        <p>Keep Track and Keep Going</p>
      </section>
      <TaskProvider>
        <TaskManager />
      </TaskProvider>
      <br />
    </div>
  );
}

export default App;
