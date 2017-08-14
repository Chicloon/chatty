import mongoose, { Schema } from 'mongoose';

const ChatSchema = new Schema({
  name: String,
  private: Boolean,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {timestamps: true});

export default mongoose.model('chat', ChatSchema);