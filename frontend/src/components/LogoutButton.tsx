import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: crimson;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background: darkred;
  }
`;

export default function LogoutButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenRoutes = ['/login', '/signup'];

  if (hiddenRoutes.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('household');
    navigate('/login');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}