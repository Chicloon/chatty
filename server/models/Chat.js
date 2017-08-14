import mongoose, { Schema } from 'mongoose';

import Chat from './Chat';

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


ChatSchema.static.addUser = function(id, userId, access) {
  return this.findByID(id)
    .then (chat => {
      const user = User.findByID(userId);
      console.log('user', user);
      chat.users.push({user, access: 1});            
      return Promise.all()
        .then( ()=> 'succsess')
    }) 
   

}

export default mongoose.model('chat', ChatSchema);