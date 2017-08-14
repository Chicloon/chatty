import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  name: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  chat: String
}, {timestamps: true});


export default mongoose.model('message', MessageSchema);