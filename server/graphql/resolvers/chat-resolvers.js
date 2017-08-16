import Chat from '../../models/Chat.js'
import Message from '../../models/Message';


export default {
  chats: (_, args) => {
    return Chat.find({})
      .populate('users.user')
  },
  createChat: async (_, { userId, name }, ctx) => {
    const { user } = ctx;

    if (!user) {
      throw new Error('need to be logged in');
    }
    if (await Chat.findOne({ name })) {
      throw new Error('Chat with this name exists')
    }

    return new Chat({ name }).save()
      .then(chat => {
        Chat.addUser(chat._id, user._id, 10)
        return chat
      });
  },
  addUserToChat: (_, { userId, chatId }) => {
    return Chat.addUser(chatId, userId)
  },
  addMessage: (_, { chatId, content}, req) => {
    const { user } = req;
    return Chat.addMessage(chatId, user._id, content);
  },
  chat(_, {chatId}) {
    return Chat.findOne({_id: chatId})
      .populate('messages')
      .populate('messages.user')
      .populate('users')
      .populate('users.user')
  },
  chatMessages: (_, {chatId}) => {
    return Message.find({chat: chatId})
      .populate('user')
  }
  

}