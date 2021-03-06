import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import resolvers from './data/resolvers';
import Schema from './data/schema';
import { Mocks } from './data/mocks';


// Настрой graphQL
const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers,
});

// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {},
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const graphQLServer = createServer(app);

graphQLServer.listen(GRAPHQL_PORT, ()=> console.log(`GraphQL Server is running on port ${GRAPHQL_PORT}/graphql`));
