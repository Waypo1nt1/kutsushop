import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ViewData from "./components/ViewDataShoes.tsx"
import ViewDataSuppliers from './components/ViewDataSuppliers'
import ViewDataOrders from './components/ViewDataOrders'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "viewdata/shoes",
        element: <ViewData />,
      },
      {
        path: "viewdata/supplies",
        element: <ViewDataSuppliers />,
      },
      {
        path: "viewdata/orders",
        element: <ViewDataOrders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
