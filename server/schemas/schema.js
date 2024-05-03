const typeDefs = `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: String!
  username: String!
  password: String!
  followers: Int!
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
  me: User # Get currently logged in user
  getUsers: [User!]! # Get all users (only for admin)
}

input SignUpInput {
  firstName: String!
  lastName: String!
  email: String!
  phoneNumber: String!
  username: String!
  password: String!
}

input SignInInput {
  email: String!
  password: String!
}

type Mutation {
  signUp(input: SignUpInput!): AuthPayload! # Sign up user
  signIn(input: SignInInput!): AuthPayload! # Sign in user
  followUser(userId: ID!): User! # Follow a user
}
`;

export default  typeDefs;
