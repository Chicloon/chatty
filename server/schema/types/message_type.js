const graphql = require('graphql');
const {
    GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

import UserType from './user_type';
import ChatType from './chat_type';

import Chat from '../../models/Chat';
import User from '../../models/User';

const MessageType = new GraphQLObjectType({
  name: 'MessageType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString},
    user: {
      type: UserType,
      resolve({ user }, args) {
        return User.findById(user)
      }
    },
    chats: {
      type: ChatType,
      resolve({chat}, args) {
        return Chat.findById(chat)
      }
    }
  }),
});

export default MessageType;
