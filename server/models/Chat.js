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
  }]
}, { timestamps: true }
);


ChatSchema.statics.addUser = function (chatId, userId, access) { 
  return this.findOne({ _id: chatId })
    .then(chat => {
      User.findById(userId)
        .then(user => {
          chat.users.push({ user: user._id, access: access || 1 })
          user.chats.push(chat._id);
          user.save();          
        })
        return Promise.all([chat.save()])
          .then(([chat])=>  chat)      
    })    
}

ChatSchema.statics.addMessage = function (chatId, messageId) {
  return this.findOne({ _id: chatId })
    .then(chat => {
      chat.messages.push(messageId);
      return Promise.all([chat.save()])
        .then(([chat]) => chat)
    });
}

export default mongoose.model('chat', ChatSchema);