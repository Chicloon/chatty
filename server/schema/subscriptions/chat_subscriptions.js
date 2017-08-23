const graphql = require('graphql');
import pubsub from '../pubsub';

import MessageType from '.././types/message_type';
const MESSAGE = 'messageAdded'

const chatSubscriptions = {
  messageAdded: {
    type: MessageType,
    subscribe: ()=>pubsub.asyncIterator(MESSAGE)
    
  }
}

export default chatSubscriptions;
