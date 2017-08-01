export default `
  type Tweet {
    _id: String
    text: String
  }


  # custom scalars
  scalar Date

  #групповой чат
  type Group {
    id: ID! #Id группы
    name: String #имя группы
    users: [User]! # пользователи группы
    messages: [Message] # сообщения в группе
  }

  # Пользователь
  type User {
    id: ID!
    email: String!
    username: String!
    fullname: String
    messages: [Message]
    groups: [Group] #группы к которым отностся пользователь
    friends: [User]
  }
  
  #Сообщения пользователя в группе
  type Message {
    id: ID
    to: Group! # Группа в котороую было отправленно сообщение
    from: User! # От кого сообщение
    text: String 
    createdAt: String! 
  }

  # Запросы для описанных типов
  type Query {

    getTweets: [Tweet]

    # пользователя по id или email
    user(email: String, id: ID): User

    # всех пользователей
    users: [User]

    # всех групп
    groups: [Group]

    # сообщения пользователя по userID 
    # или сообщения в группе по ID группы
    messages(groupId: Int, userId: Int): [Message]

    # группа по Id
    group(id: ID!): Group
  }

  type Mutation {
    # создать сообщение
    createMessage (text: String!, userId: Int!, groupId: Int!): Message
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;