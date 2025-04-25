import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    chores: [Chore]
    household: Household
  }

  type Chore {
    _id: ID!
    title: String!
    description: String
    completed: Boolean!
    assignedTo: User
    household: Household
  }

  type Household {
    _id: ID!
    name: String!
    members: [User]
    chores: [Chore]
  }

  type Query {
    users: [User]
    chores: [Chore]
    households: [Household]
    user(id: ID!): User
    chore(id: ID!): Chore
    household(id: ID!): Household
  }

  type Mutation {
    addChore(
      title: String!
      description: String
      assignedTo: ID
      household: ID!
    ): Chore
  }
`;

export default typeDefs;