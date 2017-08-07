import mongoose from 'mongoose';
const graphql = require('graphql');

// const sessions = mongoose.model('sessions')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
  
 } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    session: {
      user: {
        type: GraphQLString,
        resolve() {
          return sessions.find({});
        }
      }
    }
  }
});

module.exports = RootQueryType;
