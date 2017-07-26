export const Schema = [`
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
    # Возвращает пользователя по id или email
    user(email: String, id: ID): User

    # Возвращает сообщения пользователя по userID 
    # или сообщения в группе по ID группы
    messages(groupId: ID, userId: ID): [Message]

    # Возвращает группы по Id
    group(id: ID!): Group
  }

  schema {
    query: Query
  }
`];
export default Schema;