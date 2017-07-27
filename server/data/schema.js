export const Schema = [`
  # custom scalars
  scalar Date

  #групповой чат
  type Group {
    id: Int! #Id группы
    name: String #имя группы
    users: [User]! # пользователи группы
    messages: [Message] # сообщения в группе
  }

  # Пользователь
  type User {
    id: Int!
    email: String!
    username: String!
    fullname: String
    messages: [Message]
    groups: [Group] #группы к которым отностся пользователь
    friends: [User]
  }
  
  #Сообщения пользователя в группе
  type Message {
    id: Int
    to: Group! # Группа в котороую было отправленно сообщение
    from: User! # От кого сообщение
    text: String 
    createdAt: String! 
  }

  # Запросы для описанных типов
  type Query {
    # Возвращает пользователя по id или email
    user(email: String, id: Int): User

    # Возвращает сообщения пользователя по userID 
    # или сообщения в группе по ID группы
    messages(groupId: Int, userId: Int): [Message]

    # Возвращает группы по Id
    group(id: Int!): Group
  }

  schema {
    query: Query
  }
`];
export default Schema;