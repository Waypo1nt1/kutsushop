import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Orders from "./components/pages/orders"
import Shoes from './components/pages/shoes'
import Suppliers from './components/pages/suppliers'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "viewdata/shoes",
        element: <Shoes />,
      },
      {
        path: "viewdata/supplies",
        element: <Suppliers />,
      },
      {
        path: "viewdata/orders",
        element: <Orders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
