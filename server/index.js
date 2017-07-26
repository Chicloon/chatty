import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import mongoose from 'mongoose';

import { Schema } from './data/schema';
import { Mocks } from './data/mocks';

// Соединнение с mongoDB
const MONGO_URI = 'mongodb://localhost:27017/chatty';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')});
db.once('open', () =>    console.log( '+++Connected to mongoose'));

// Настрой graphQL
const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: true,
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {},
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const graphQLServer = createServer(app);

graphQLServer.listen(GRAPHQL_PORT, ()=> console.log(`GraphQL Server is running on port ${GRAPHQL_PORT}/graphql`));
