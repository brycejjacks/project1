import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import TaskPicker from "./pages/TaskPicker"

function App() {
  return (
    <>
    <Routes>
      {/* Home page route */}
      <Route path="/" element={<Home />} />
      
      {/* task picker route */}
      <Route path="/task-picker" element={<TaskPicker />} />
      
      {/* Catch-all route for 404 - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

export default App
