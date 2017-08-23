import AuthService from '../../services/auth.js';

import User from '../../models/User';
import Message from '../../models/Message';

export default {
  // querries
  user: (_, { userId }, req) => {
    return req.user;
  },
  users: (_, args, req) => {
    return req.user&& User.find({});    
  },
  // mutations
  login: (_, { username, password }, req) => {
    return AuthService.login({ username, password, req })
  },
  logout: (_, args, req) => {
    const { user } = req;
    req.logout();
    return user;
  },
  signup: (_, { username, password }, req) => {
    return AuthService.signup({ username, password, req });
  },
  // Fields resolvers
  chatsField: (parentValue, args) => {
    return User.findChats(parentValue.id)
  },
  messagesField: (parentValue, args) => {
    return User.findById(parentValue.id)
      .populate('messages')
      .then(user => user.messages)
  },
}