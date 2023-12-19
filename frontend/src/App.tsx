import { useState } from 'react'
import { useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import {Footer} from './components/Footer'
import {AdminPanel} from './components/AdminPanel'
import {LoginForm} from './components/LoginForm'
import axios from "axios"

import './app.css'

export type Shoes = {
  id: number
  shoes_name: string
}


function App() {
  const [shoes, setShoes] = useState<Shoes[] | null>()
  useEffect(() => {
    const url = "http://localhost:3000/data"
    axios.get(url).then((response) => {
      setShoes(response.data)
    })
  }, [])
  let isLoggedIn = true
  let content;
  <div>
    {isLoggedIn ? (
      content = <AdminPanel shoes={shoes ? shoes.map((shoe) =>
         {return shoe.shoes_name
        })
          : null} />
    ) : (
      content = <LoginForm />
    )}
  </div>
  
  return (
    <>
      {content}
      <Footer />
    </>
  )
}

export default App


/*
<div className="px-5 pt-10 w-full h-full flex flex-col items-center">
      <h1>
        </h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      <h1>Vite + React</h1>
        <button className="btn" onClick={() => setCount(count+1)}>
          count is {count}
        </button>
</div>
        */
