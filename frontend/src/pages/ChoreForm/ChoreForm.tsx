import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_CHORE, GET_CHORES, GET_USERS } from '../../graphql/chores';

const FormContainer = styled.div`
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

const Input = styled.input`
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

export default function ChoreForm() {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const householdId = localStorage.getItem('household'); // Stored at signup/login

  const { data: userData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);

  const [addChore] = useMutation(ADD_CHORE, {
    refetchQueries: [{ query: GET_CHORES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!householdId) {
      alert('No household found. Please log in again.');
      return;
    }

    try {
      await addChore({
        variables: {
          title,
          household: householdId,
          assignedTo: assignedTo || undefined,
          description: description || undefined,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error adding chore:', err);
    }
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users</p>;

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Create New Chore</h2>
        <Input
          type="text"
          placeholder="Chore Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <label>Assign To:</label>
        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          style={{ marginBottom: '1rem', padding: '0.8rem', borderRadius: '8px', width: '100%' }}
        >
          <option value="">-- Unassigned --</option>
          {userData?.users.map((user: any) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <Input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button type="submit">Create Chore</Button>
      </Form>
    </FormContainer>
  );
}