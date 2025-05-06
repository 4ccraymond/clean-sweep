import { gql } from '@apollo/client';

// Queries
export const GET_CHORES = gql`
  query {
    chores {
      _id
      title
      completed
      assignedTo {
        _id
        username
      }
      repeatEvery
      lastCompleted
    }
  }
`;

// Mutations
export const MARK_CHORE_COMPLETED = gql`
  mutation MarkChoreCompleted($choreId: ID!, $completed: Boolean!) {
    markChoreCompleted(choreId: $choreId, completed: $completed) {
      _id
      completed
      lastCompleted
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

export const RESET_RECURRING_CHORES = gql`
  mutation {
    resetRecurringChores {
      _id
      completed
    }
  }
`;

export const CLEAR_COMPLETED_CHORES = gql`
  mutation {
    clearCompletedChores {
      _id
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
      description
      assignedTo {
        _id
        username
      }
      repeatEvery
      lastCompleted
    }
  }
`;