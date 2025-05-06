import { gql } from '@apollo/client';

export const GET_CHORES = gql`
  query GetChores {
    chores {
      _id
      title
      completed
    }
  }
`;

export const MARK_CHORE_COMPLETED = gql`
  mutation MarkChoreCompleted($choreId: ID!, $completed: Boolean!) {
    markChoreCompleted(choreId: $choreId, completed: $completed) {
      _id
      title
      completed
    }
  }
`;