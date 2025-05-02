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
    repeatEvery: Int
    lastCompleted: String
  }

  type Household {
    _id: ID!
    name: String!
    members: [User]
    chores: [Chore]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    chores: [Chore]
    households: [Household]
    user(id: ID!): User
    chore(id: ID!): Chore
    household(id: ID!): Household

    choreAssignments: [Chore]
  }

  type Mutation {
  
    login(
      email: String!, 
      password: String!
      ): AuthPayload

    addChore(
      title: String!
      description: String
      assignedTo: ID
      household: ID!
      repeatEvery: Int
      lastCompleted: String
    ): Chore

    markChoreCompleted(choreId: ID!, completed: Boolean!): Chore

    assignChore(choreId: ID!, userId: ID!): Chore

    updateChore(
      choreId: ID!
      title: String
      description: String
      completed: Boolean
      assignedTo: ID
      repeatEvery: Int
      lastCompleted: String
    ): Chore

    deleteChore(choreId: ID!): Chore

    unassignChore(choreId: ID!): Chore

    clearCompletedChores: [Chore]

    resetRecurringChores: [Chore]

    addUser(
      username: String!
      email: String
      password: String!
      household: ID!
    ): User

    updateUser(
      userId: ID!
      username: String
      email: String
      household: ID
    ): User

    joinHousehold(userId: ID!, householdId: ID!): User

    deleteUser(userId: ID!): User

    addHousehold(name: String!): Household

    updateHousehold(householdId: ID!, name: String): Household

    deleteHousehold(householdId: ID!): Household
  }
`;

export default typeDefs;