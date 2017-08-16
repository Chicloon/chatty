const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

import UserType from './user_type';

const ChatType = new GraphQLObjectType({
    name: 'ChatType',
    fields: {
      id: { type: GraphQLID},
      name: { type: GraphQLString},
      users: {
        type: new GraphQLList(UserType),
        resolve(parentValue, args, req) {
          // ДОделать тут
        }
      },

    }

    id: ID!
    name: String!
    users: [ChatUser]
    messages: [Message]
    createdAt: Date