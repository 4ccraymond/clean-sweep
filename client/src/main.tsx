import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
// import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login/Login.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Signup from './pages/Signup/Signup.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* <ChakraProvider> */}
        <RouterProvider router={router}/>
      {/* </ChakraProvider> */}
    </StrictMode>
  );
}