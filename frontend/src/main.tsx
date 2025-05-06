import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Signup/Signup';
import { GlobalStyle, theme } from './styles/globalStyles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/signup', element: <Signup /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);