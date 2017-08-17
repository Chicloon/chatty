const graphql = require('graphql');
const {
    GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

import UserType from './user_type';
import User from '../../models/User';

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    access: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parentValue, args) {
        return User.findById(parentValue.user)
          .then(user => user)
      }
    },
  })
});

export default MemberType;
