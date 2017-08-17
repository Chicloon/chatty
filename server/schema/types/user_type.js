const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

import ChatType from './chat_type';
import MessageType from './message_type';
import Chat from '../../models/Chat';
import User from '../../models/User';

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        chats: {
            type: new GraphQLList(ChatType),
            resolve(parentValue, args) {
                return User.findChats(parentValue.id)
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parentValue, args) {
                return User.findById(parentValue.id)
                    .populate('messages')
                    .then(user => user.messages)
            }
        }
    }),
});

export default UserType;
