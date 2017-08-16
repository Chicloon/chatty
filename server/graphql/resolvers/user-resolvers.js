import AuthService from '../../services/auth.js';

import User from '../../models/User';
import Message from '../../models/Message';

export default {  
  login: (_, {username, password}, req) => {
    return AuthService.login({username, password, req})
  },
  signup: (_, {username, password}, req)=> {
    return AuthService.signup({username, password, req});    
  },
  logout: (_, args, req) => {
    const {user} = req;
    req.logout();
    return user;
  },
  user: (_, args, req) => {
    return req.user;
  },
  users:() => {
    return User.find()
      .populate('chats');
  },
  addMessage: (_, {content}, req) => {
    const { user } = req;
    return User.addMessage(user._id, content)      
   
  },
  messages: (_, args, req) => {
    const { user } = req;
    return Message.find({user: user._id})
      .populate('user')
      .exec((err, message)=> {
        console.log(message)
      })
  }

  
}