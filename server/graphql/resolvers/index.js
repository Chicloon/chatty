import GraphQLDate from 'graphql-date';

import UserResolvers from './user-resolvers'
import ChatResolvers from './chat-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    user: UserResolvers.user,    
    chats: ChatResolvers.chats, 
  },
  Mutation: {    
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    logout: UserResolvers.logout,
    createChat: ChatResolvers.createChat,
  },  
}