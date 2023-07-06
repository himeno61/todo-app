import './App.css'
import Todos from "./todo/Todos.tsx";

function App() {
    return (
    <>
      <h1>Simple todo list</h1>
      <div className="card">
          <Todos/>
      </div>

    </>
  )
}

export default App
