import styled from 'styled-components';

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
  return (
    <FormContainer>
      <Form>
        <h2>Create New Chore</h2>
        <Input type="text" placeholder="Chore Name" />
        <Input type="text" placeholder="Assigned to" />
        <Button type="submit">Create Chore</Button>
      </Form>
    </FormContainer>
  );
}
// This is a simple chore creation form using styled-components for styling.
// It includes a container for centering the form, a form element, input fields for chore name and assigned person, and a submit button.
// The form is styled with a white background, padding, border-radius, and box-shadow for a card-like appearance.
// The input fields and button are styled for a consistent look and feel.
// The button changes color on hover for better user experience.
// The form is responsive and will adjust to different screen sizes due to the use of flexbox in the container.

//mobile responsive design
// Removed duplicate declaration of FormContainer

const ResponsiveForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;
