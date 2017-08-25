import { hashSync, compareSync }  from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

import Message from './Message';
import Chat from './Chat';

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema({
  username: String,
  password: String,
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'chat'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message'
  }],
});


UserSchema.statics.addMessage = function (userId, chatId, content) {
  return this.findOne({ _id: userId })
    .then(user => {
      const message = new Message({ content, user: userId });
      const chat = Chat.findOne({ _id: chatId });
      user.messages.push(message);
      console.log(chatchat);
      return Promise.all([user.save(), message.save()])
        .then(([user, message]) => {
          // console.log(chat);
          return message
        })

    })
}

UserSchema.statics.findChats = function (userId) {
  return this.findOne({ _id: userId })    
    .populate('chats')
    .then(user =>  user.chats)
}

UserSchema.statics.findMessages = function (userId) {
  return this.findOne({_id: userId})
    .populate('messages')
    .then(user => user.messages)
}

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    )
  }
}

export default mongoose.model('user', UserSchema);
