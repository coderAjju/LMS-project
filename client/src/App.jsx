import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Login/>
    <Button></Button>
    </main>
  )
}

export default App
