export default `
  scalar Date

  type Member {    
    user: User
    access: Int
  }

  type Chat {
    id: ID!
    name: String!
    members: [Member]
    messages: [Message]    
  }

  type Message {
    id: ID!
    content: String
    user: User
    chat: Chat    
    createdAt: Date
  }

  type User {
    id: ID!
    username: String
    messages: [Message]    
    chats: [Chat]
  }

  type Query {
    user(userId: ID): User
    users: [User]
    chat(chatId: ID): Chat
    chats: [Chat]    
  }

  type Mutation {
    login (username: String!, password: String!): User
    logout: User
    signup (username: String!, password: String!): User 
    addMessage(chatId: ID!, content: String): Message
    createChat(name: String): Chat
    addUserToChat(userId: ID, chatId: ID, access: Int): Member    
  }

  schema {
    query: Query,
    mutation: Mutation

  }
`;