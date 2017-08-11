export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type User {
    id: ID!
    username: String   
  }

  type Query {
    user(id: ID): User
  }

  type Mutation {
    login (username: String!, password: String!): User
    logout: User
    signup (username: String!, password: String!): User 
  }

  schema {
    query: Query,
    mutation: Mutation

  }
`;