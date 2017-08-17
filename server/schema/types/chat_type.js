const graphql = require('graphql');
const {
    GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

import UserType from './user_type';
import MemberType from './member_type';

const ChatType = new GraphQLObjectType({
  name: 'ChatType',
  fields: () => ( {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    members: {
      type: new GraphQLList(MemberType),    
    }
  }),
});

export default ChatType;


