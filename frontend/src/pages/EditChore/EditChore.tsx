import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GET_CHORE, UPDATE_CHORE, GET_CHORES, GET_USERS } from '../../graphql/chores';

const Container = styled.div`
  display: flex;
  justify-content: center;
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

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
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

export default function EditChore() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CHORE, {
    variables: { id },
  });

  const { data: userData } = useQuery(GET_USERS);

  const [updateChore] = useMutation(UPDATE_CHORE, {
    refetchQueries: [{ query: GET_CHORES }],
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [repeatEvery, setRepeatEvery] = useState('');

  useEffect(() => {
    if (data?.chore) {
      setTitle(data.chore.title || '');
      setDescription(data.chore.description || '');
      setAssignedTo(data.chore.assignedTo?._id || '');
      setRepeatEvery(data.chore.repeatEvery?.toString() || '');
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateChore({
        variables: {
          choreId: id,
          title,
          description,
          assignedTo: assignedTo || null,
          repeatEvery: repeatEvery ? parseInt(repeatEvery) : undefined,
        },
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating chore:', err);
      alert('Failed to update chore.');
    }
  };

  if (loading) return <p>Loading chore...</p>;
  if (error) return <p>Error loading chore</p>;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Edit Chore</h2>
        <Input
          type="text"
          placeholder="Chore Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Repeat every N days (optional)"
          value={repeatEvery}
          onChange={e => setRepeatEvery(e.target.value)}
          min="1"
        />
        <label>Assign To:</label>
        <Select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
          <option value="">-- Unassigned --</option>
          {userData?.users.map((user: any) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </Select>
        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
}
