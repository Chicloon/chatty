import mongoose, { Schema } from 'mongoose';

import Chat from './Chat';
import User from './User';

const ChatSchema = new Schema({
  name: String,
  private: Boolean,
  users: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    access: Number
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true }
);


ChatSchema.statics.addUser = function (chatId, userId, access) {
  return this.findByID(chatId)
    .then(chat => {
      User.findById(userId)
        .then(user => {
          chat.users.push({ user: user._id, access: access || 10 })
          user.chats.push(chat._id);
          return Promise.all([user.save()])
        })
      return Promise.all([chat.save()])
        .then(chat => chat);
    })
}

ChatSchema.statics.addMessage = function (chatId, messageId) {
  return this.findById(chatId)
    .then(chat => {
      chat.messages.push(messageId);
      return Promise.all([chat.save()])
        .then(chat => chat)
    }); 
}

export default mongoose.model('chat', ChatSchema);