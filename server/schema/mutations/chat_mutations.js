const graphql = require('graphql');
const {
	GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql;

import pubsub from '../pubsub';


const AuthService = require('../../services/auth');

import MemeberType from '../types/member_type';
import MessageType from '../types/message_type';
import ChatType from '../types/chat_type';

import Chat from '../../models/Chat';

const chatMutations = {
  addMessage: {
    type: MessageType,
    args: {
      chatId: {type: GraphQLID},
      content: {type: GraphQLString},
    },
    async resolve(_, {chatId, content}, req) {
      const { user } = req;
      const message = await Chat.addMessage(chatId, user._id, content);
      
      pubsub.publish('messageAdded', {['messageAdded']: message});      
      return message;
    }
  },
  addUser: {
    type: MemeberType,
    args: {
      chatId: {type: GraphQLID},
      userId: {type: GraphQLID},
      access: {type: GraphQLInt}
    },
    resolve(_, {chatId, userId, access}) {
      return Chat.addUser(chatId, userId, access)        
    }
  },
  createChat: {
    type: ChatType,
    args: {
      name: {type: GraphQLString}
    },
    resolve(_, {name}, req) {
      const { user } = req;
      return Chat.createChat(name, user)
    }
  }

}



export default chatMutations

