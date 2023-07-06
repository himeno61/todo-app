import { useState } from 'react'
import './App.css'
import Todos from "./todo/Todos.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Simple todo list</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Todos/>
    </>
  )
}

export default App
