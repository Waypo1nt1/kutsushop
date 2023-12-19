import { useState } from 'react'
import { useEffect } from 'react'
import {Footer} from './components/Footer'
import {AdminPanel} from './components/AdminPanel'
import {LoginForm} from './components/LoginForm'
import axios from "axios"

import './index.css'

export type Shoes = {
  id: number
  shoes_name: string
}


function App() {
  const [shoes, setShoes] = useState<Shoes[] | null>()
  const [isLoggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    const url = "http://localhost:3000/data"
    axios.get(url).then((response) => {
      setShoes(response.data)
    })
  }, [])



  return (
    <>
    {isLoggedIn ? <AdminPanel shoes={shoes ?? []} /> : <LoginForm />}
      <Footer />
    </>
  )
}

export default App
