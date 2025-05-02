export default function Dashboard() {
    return (
        <p>
            Dashboard
        </p>
    )
}

import styled from 'styled-components';

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
  margin-top: 2rem;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`;

export default function Dashboard() {
  return (
    <Container>
      <h2>Chore Dashboard</h2>
      <ChoreList>
        <ChoreItem>
          <span>Chore 1</span>
          <Button>Complete</Button>
        </ChoreItem>
        <ChoreItem>
          <span>Chore 2</span>
          <Button>Complete</Button>
        </ChoreItem>
      </ChoreList>
      <Button>Add New Chore</Button>
    </Container>
  );
}
