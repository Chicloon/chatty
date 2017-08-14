import Chat from '../../models/Chat.js'

export default {
  chats: (_, args) => {
    // return (Chat.find({})
    return (Chat.addUser('599103f873f6e0940f0443e1', '594b3d9b663f831991576f86' ));
  },
  createChat: (_, { userId, name}) => {
    console.log(name);
    return (new Chat({users: userId, name})).save()
  },
  chatUser: (_, {chatId, userId}) => {

  }
}