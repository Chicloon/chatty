const graphql = require('graphql');
const {
	GraphQLObjectType,
} = graphql;


import user from './user_mutations';

const mutation = new GraphQLObjectType({
	name: 'Mutation',	
  fields: {...user},
});

module.exports = mutation;