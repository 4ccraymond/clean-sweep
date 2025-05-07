import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GET_HOUSEHOLDS, JOIN_HOUSEHOLD } from '../../graphql/users';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bg};
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 320px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`;

export default function JoinHousehold() {
  const [selectedHousehold, setSelectedHousehold] = useState('');
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_HOUSEHOLDS);
  const [joinHousehold] = useMutation(JOIN_HOUSEHOLD);

  const token = localStorage.getItem('token');
  let userId = '';

  try {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      userId = decoded.userId;
    }
  } catch (e) {
    console.error('Invalid token');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !selectedHousehold) {
      alert('Please select a household.');
      return;
    }

    try {
      await joinHousehold({
        variables: {
          userId,
          householdId: selectedHousehold,
        },
      });

      localStorage.setItem('household', selectedHousehold);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error joining household:', err);
      alert('Failed to join household.');
    }
  };

  if (loading) return <p>Loading households...</p>;
  if (error) return <p>Error loading households</p>;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Join a Household</h2>
        <Select value={selectedHousehold} onChange={e => setSelectedHousehold(e.target.value)}>
          <option value="">-- Select Household --</option>
          {data?.households.map((household: any) => (
            <option key={household._id} value={household._id}>
              {household.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Join</Button>
      </Form>
    </Container>
  );
}
