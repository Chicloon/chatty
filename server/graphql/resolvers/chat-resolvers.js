import Chat from '../../models/Chat.js'

export default {
  chats: (_, args) => {
    return Chat.find({})
      .populate('users.user')
    // return (Chat.addUser('599103f873f6e0940f0443e1', '594b3d9b663f831991576f86' ));
  },
  createChat: async (_, { userId, name }, ctx) => {
    const { user } = ctx;

    if (!user) {
      throw new Error('need to be logged in');
    }
    if (await Chat.findOne({name})) {
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

}