import GraphQLDate from 'graphql-date';


import UserResolvers from './user-resolvers'

export default {
  Date: GraphQLDate,
  Query: {
    user: UserResolvers.user,    
  },
  Mutation: {    
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    logout: UserResolvers.logout,
  },  
}