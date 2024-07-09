import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root/root.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp.tsx';
import LogIn from './pages/LogIn.tsx';
import AuthProvider from './auth/AuthProvider.tsx';
import ExperimentUseForm from './pages/ExperimentUseForm.tsx';
import Services from './pages/Services.tsx'
import SaveContructor from './pages/SaveContructor.tsx';
import ProtectRoutes from './auth/ProtectRoutes.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectRoutes><Root /></ProtectRoutes>),
    children : [
      {
        path: "/experimentform",
        element: <ExperimentUseForm/>
      },
      {
        path: "/services",
        element: <Services />
      },
      {
        path: "/dashboard",
        element: <Services />
      },
      {
        path: "/savecontructor",
        element : <SaveContructor />
      }
    ]
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <LogIn />
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
