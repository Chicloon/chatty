const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
 } = graphql;

// const UserType = require('./user_type');
import UserType from './user_type';
import ChatType from './chat_type';
import MessageType from './message_type';

import Chat from '../../models/Chat';
import User from '../../models/User';
import Message from '../../models/Message';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(){
        return User.find({})
      }
    },
    chat: {
      type: ChatType,
      args: {id: {type: GraphQLID }},
      resolve(parentValue, {id}) {
        return Chat.findById(id)
      }
    },    
    chats: {
      type: new GraphQLList(ChatType),
      resolve() {
        return Chat.find({})
          .populate('members')
          .then(chat=> chat)
      }
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve() {
        return Message.find({})
      }

    }
  }
});

module.exports = RootQueryType;
