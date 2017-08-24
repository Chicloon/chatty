import User from '../../models/User';
import Chat from '../../models/Chat';

export default {
  // Fields resolvers
  userField: ({ user }, args) => {
    return User.findById(user)
  },
  chatField: ({chat}, args) => {
    return Chat.findById(chat)
  }
}