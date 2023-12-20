import { useState } from 'react'
import {Footer} from './components/Footer'
import {AdminPanel} from './components/AdminPanel'
import {LoginForm} from './components/LoginForm'

import './index.css'




function App() {
  const [isLoggedIn, setLoggedIn] = useState(true)
  
  return (
    <>
    {isLoggedIn ? <AdminPanel /> : <LoginForm />}
      <Footer />
    </>
  )
}

export default App
