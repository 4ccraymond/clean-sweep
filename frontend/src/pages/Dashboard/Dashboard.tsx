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
// This is a simple dashboard for managing chores using styled-components for styling.
// It includes a container for the dashboard, a list of chores, and buttons for completing and adding new chores.
// The dashboard is styled with a light background, and the chore items are displayed in a card-like format with shadows for depth.
// The buttons are styled for a consistent look and feel, with hover effects for better user experience.
// The layout is responsive and will adjust to different screen sizes due to the use of flexbox in the container and chore list.

//mobile responsive
const ResponsiveChoreList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ResponsiveChoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  span {
    flex: 1;
    min-width: 150px;
    margin-bottom: 0.5rem;
  }

  button {
    flex-shrink: 0;
  }
`;
