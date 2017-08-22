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
  members: [{
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
  if (!user) {
    throw new Error('Need to be loggedin')
  }

  return new Chat({ name, members: {user, access: 10 }}).save()
    .then(chat => {
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
      chat.members.push({ user: user._id, access: access || 1 })
      return Promise.all([chat.save()])
        .then(([chat]) => {
          return User.findById(userId)
            .then(user => {
              return { user: user.id, access: access || 1 }
            })
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
          return message
        })
    })
}



export default mongoose.model('chat', ChatSchema);