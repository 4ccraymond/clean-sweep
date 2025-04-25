import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
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