import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
  }
  type Query {
    getUsers: [User]
    getUser(name: String!): User!
    test: String!
  }
`;
