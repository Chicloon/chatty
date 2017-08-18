const graphql = require('graphql');
const {
    GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

import UserType from './user_type';
import MemberType from './member_type';
import MessageType from './message_type';

import Chat from '../../models/Chat';

const ChatType = new GraphQLObjectType({
  name: 'ChatType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    members: {
      type: new GraphQLList(MemberType),
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parentValue, args) {
        return Chat.findById(parentValue.id)
          .populate('messages')
          .then(chat => chat.messages);
      }
    }
  }),
});

export default ChatType;


