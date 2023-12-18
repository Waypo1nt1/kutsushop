import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import {Footer} from './components/Footer'
import {AdminPanel} from './components/AdminPanel'
import {LoginForm} from './components/LoginForm'

import './app.css'

function App() {
  //const [count, setCount] = useState(0)

  let isLoggedIn = true
  let content;
  if (isLoggedIn) {
    content = <AdminPanel />
  } else {
    content = <LoginForm />
  }
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
