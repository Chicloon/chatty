import GraphQLDate from 'graphql-date';

import UserResolvers from './user-resolvers'
import ChatResolvers from './chat-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    user: UserResolvers.user,    
    users: UserResolvers.users,
    chat: ChatResolvers.chat,
    chats: ChatResolvers.chats,     
    messages: UserResolvers.messages,    
    chatMessages: ChatResolvers.chatMessages
  },
  Mutation: {    
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    logout: UserResolvers.logout,
    createChat: ChatResolvers.createChat,
    addUserToChat: ChatResolvers.addUserToChat,
    addMessage: ChatResolvers.addMessage,
  },  
}