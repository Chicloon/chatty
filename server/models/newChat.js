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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true }
);


ChatSchema.virtual('messages', {
  ref: 'message',
  localField: 'name',
  foreignField: 'chat',
  justOne: false
})

export default mongoose.model('newChat', ChatSchema);