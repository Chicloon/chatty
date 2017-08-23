import GraphQLDate from 'graphql-date';

import UserResolvers from './user-resolvers'
import ChatResolvers from './chat-resolvers';
import MemberResolvers from './member-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    user: UserResolvers.user,    
    users: UserResolvers.users,
    chat: ChatResolvers.chat,
    chats: ChatResolvers.chats,        
  },
  Mutation: {    
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    logout: UserResolvers.logout,
    createChat: ChatResolvers.createChat,
    addUserToChat: ChatResolvers.addUser,
    addMessage: ChatResolvers.addMessage,
  },  
  Chat: {
    messages: ChatResolvers.messagesField,
  },
  Member: {
    user: MemberResolvers.userField
  },
  User: {
    chats: UserResolvers.chatsField,
    messages: UserResolvers.messagesField,
  }
}