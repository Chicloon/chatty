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
    isAdmin: Boolean
    messages: [Message]    
    chats: [Chat]
  }

  type Query {
    user(userId: ID): User
    users: [User]
    chat(id: ID): Chat
    chats: [Chat]    
  }

  type Mutation {
    login (username: String!, password: String!): User
    logout: User
    signup (username: String!, password: String!, isAdmin: Boolean): User 
    addMessage(chatId: ID!, content: String): Message
    createChat(name: String): Chat
    deleteChat(chatId: ID!): Chat
    addUserToChat(userId: ID, chatId: ID, access: Int): Member    
  }

  type Subscription {
    messageAdded: Message
  }


  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;