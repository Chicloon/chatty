const graphql = require('graphql');
const {
	GraphQLObjectType,
} = graphql;


import user from './user_mutations';
import chat from './chat_mutations';

const mutation = new GraphQLObjectType({
	name: 'Mutation',	
  fields: {...user, ...chat},
});

module.exports = mutation;