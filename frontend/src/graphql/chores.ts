import { gql } from '@apollo/client';

export const GET_CHORES = gql`
  query GetChores {
    chores {
      _id
      title
      completed
      description
      assignedTo {
        _id
        username
      }
    }
  }
`;

export const MARK_CHORE_COMPLETED = gql`
  mutation MarkChoreCompleted($choreId: ID!, $completed: Boolean!) {
    markChoreCompleted(choreId: $choreId, completed: $completed) {
      _id
      completed
    }
  }
`;

export const ADD_CHORE = gql`
  mutation AddChore(
    $title: String!
    $description: String
    $assignedTo: ID
    $household: ID!
    $repeatEvery: Int
    $lastCompleted: String
  ) {
    addChore(
      title: $title
      description: $description
      assignedTo: $assignedTo
      household: $household
      repeatEvery: $repeatEvery
      lastCompleted: $lastCompleted
    ) {
      _id
      title
      completed
    }
  }
`;

export const UNASSIGN_CHORE = gql`
  mutation UnassignChore($choreId: ID!) {
    unassignChore(choreId: $choreId) {
      _id
      assignedTo {
        _id
      }
    }
  }
`;

export const DELETE_CHORE = gql`
  mutation DeleteChore($choreId: ID!) {
    deleteChore(choreId: $choreId) {
      _id
    }
  }
`;
 