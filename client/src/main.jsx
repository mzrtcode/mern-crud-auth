import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import TaskFormPage from './pages/TaskFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import { TaskProvider } from './context/TasksContext.jsx';
import Navbar from './components/Navbar.jsx';

const router = createBrowserRouter([
  // RUTAS PUBLICAS
{
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <ProtectedRoute />, //Elemento padre
        children: [
          {
            path: "/tasks",
            element: <TaskPage />,
          },
          {
            path: "/add-task",
            element: <TaskFormPage />
          },
          {
            path: "/tasks/:id",
            element: <TaskFormPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ]
      }
    ]
}
  

  // RUTAS PRIVADAS
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>
      <AuthProvider>
        <RouterProvider router={router}>
          <Navbar />
        </RouterProvider>
      </AuthProvider>
    </TaskProvider>
  </React.StrictMode>,
)