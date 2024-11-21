import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './AuthPages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
