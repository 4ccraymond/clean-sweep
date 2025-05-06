import { useQuery, useMutation } from '@apollo/client';
import { GET_CHORES, MARK_CHORE_COMPLETED } from '../../graphql/chores';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bg};
`;

const ChoreList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`;



export default function Dashboard() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_CHORES);
  const [markChoreCompleted] = useMutation(MARK_CHORE_COMPLETED);

  const handleComplete = async (id: string) => {
    await markChoreCompleted({ variables: { choreId: id, completed: true } });
    refetch(); // refresh the list
  };

  if (loading) return <p>Loading chores...</p>;
  if (error) return <p>Error loading chores</p>;

  return (
    <Container>
      <h2>Chore Dashboard</h2>
      <ChoreList>
        {data?.chores.map((chore: any) => (
          <ChoreItem key={chore._id}>
            <span>{chore.title}</span>
            {!chore.completed && (
              <Button onClick={() => handleComplete(chore._id)}>Complete</Button>
            )}
          </ChoreItem>
        ))}
      </ChoreList>
      <Button onClick={() => navigate('/chore-form')}>Add New Chore</Button>
    </Container>
  );
}