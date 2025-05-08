// import './App.css';
import { Outlet } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';

function App() {

  return (
    <>
      <LogoutButton/>
      <Outlet/>
    </>
  );
}

export default App