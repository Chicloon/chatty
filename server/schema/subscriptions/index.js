const graphql = require('graphql');
const {
	GraphQLObjectType,
} = graphql;



import chat from './chat_subscriptions';

const subscription = new GraphQLObjectType({
	name: 'Subscription',	
  fields: {...chat},
});

module.exports = subscription;