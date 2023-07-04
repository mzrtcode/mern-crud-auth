import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home page</h1>,
  },
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
  {
    path: "/register",
    element: <h1>Register</h1>,
  },
  {
    path: "/tasks",
    element: <h1>Tasks</h1>,
  },
  {
    path: "/add-task",
    element: <h1>Add task</h1>,
  },
  {
    path: "/tasks/:id",
    element: <h1>Update task</h1>,
  },
  {
    path: "/profile",
    element: <h1>Profile</h1>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
