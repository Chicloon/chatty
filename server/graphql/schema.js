export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type ChatUser {    
    user: User
    access: Int
  }

  type Chat {
    id: ID!
    name: String!
    users: [ChatUser]
    messages: [Message]
    createdAt: Date
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
    user(id: ID): User
    chat(id: ID): Chat
    chats: [Chat]
    chatUser(chatId: ID, userId: ID): ChatUser
    message(id: ID): Message
    users: [User]
    messages: [Message]
  }

  type Mutation {
    login (username: String!, password: String!): User
    logout: User
    signup (username: String!, password: String!): User 
    sendMessage(userId: ID!, chatId: ID!): Message
    createChat(userId: ID, name: String): Chat
    addUserToChat(userId: ID, chatId: ID): Chat
    addMessage(content: String): Message
  }

  schema {
    query: Query,
    mutation: Mutation

  }
`;