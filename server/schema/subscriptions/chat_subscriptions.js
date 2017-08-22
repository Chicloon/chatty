const graphql = require('graphql');
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

import MessageType from '.././types/message_type';

const chatSubscriptions = {
  messageAdded: {
    type: MessageType,
    resolve(){
      console.log('got message');
      return pubsub.asyncIterator('messageAdded')
    }
  }
}

export default chatSubscriptions;
