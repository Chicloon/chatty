import Chat from '../../models/Chat.js'
import Message from '../../models/Message';

import { pubsub } from '../pubsub';

const MESSAGE_ADDED = 'messageAdded';

export default {
  // queries
  chat: (parentValue, {id}) => {
    return Chat.findById(id)
  },
  chats: (_, args) => {
    return Chat.find({})
    .populate('members')
    .then(chat=> chat)
    
  },
  // mutations
  addMessage: async (_, {chatId, content}, req) => {
    const { user } = req;
    const message = await Chat.addMessage(chatId, user._id, content);

    pubsub.publish(MESSAGE_ADDED, {[MESSAGE_ADDED]: message});

    return message
  },
  addUser: (_, {chatId, userId, access}) => {
    return Chat.addUser(chatId, userId, access)        
  },
  createChat: (_, {name}, req) => {
    const { user } = req;
    return Chat.createChat(name, user)
  },
  deleteChat: async (_, {chatId}, req) => {
    const { user } = req;
    if(!user.isAdmin) {throw new Error('Permission denied'); }
    const chat = await Chat.findOne({_id: chatId});
    Chat.remove({_id: chatId},  function (err) {if(err) console.log(err)});       
    return chat;
  },
  // Field resolvers
  messagesField: (parentValue, args) => {
    return Chat.findById(parentValue.id)
      .populate('messages')
      .then(chat => chat.messages);
  },
  //Subscriptions 
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED)
  },
}