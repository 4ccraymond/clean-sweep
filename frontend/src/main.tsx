import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
// import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login/Login.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Signup from './pages/Signup/Signup.tsx'
// css in js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/globalStyles.ts';
import App from './App';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {GlobalStyle()}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);