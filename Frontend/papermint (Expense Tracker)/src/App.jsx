import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './AuthPages/LoginAndRegister'
import Home from './Public Pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
    </Route>
      <Route path="/login" element={<Login />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
