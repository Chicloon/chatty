import mongoose, { Schema } from 'mongoose';

import Chat from './Chat';
import User from './User';
import Message from './Message';

const ChatSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
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


ChatSchema.statics.createChat = function (name, user) {
  // console.log(name, user);
  if (!user) {
    throw new Error('Need to be loggedin')
  }

  return new Chat({ name }).save()
    .then(chat => {
      Chat.addUser(chat._id, user._id, 10);
      console.log(chat);
      return chat
    });

}

ChatSchema.statics.addUser = function (chatId, userId, access) {
  return this.findOne({ _id: chatId })
    .then(chat => {
      const user = User.findById(userId)
        .then(user => {
          user.chats.push(chat._id);
          user.save();
        })
      chat.users.push({ user: user._id, access: access || 1 })
      return Promise.all([chat.save()])
        .then(([chat]) => {
          console.log('Chat updated', chat);
          return chat
        })
    })

}

ChatSchema.statics.addMessage = function (chatId, userId, content) {
  return this.findOne({ _id: chatId })
    .then(chat => {
      const message = new Message({ content, user: userId, chat: chatId });
      const user = User.findOne({ _id: userId })
        .then(user => {
          user.messages.push(message);
          user.save()
        })
      chat.messages.push(message)
      return Promise.all([chat.save(), message.save()])
        .then(([chat, message]) => {
          console.log(chat);
          console.log(message);
          return message
        })
    })
}

export default mongoose.model('chat', ChatSchema);