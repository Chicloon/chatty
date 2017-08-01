import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

// import resolvers from './graphql/resolvers';
// import Schema from './graphql/schema';
// import { Mocks } from './graphql/mocks';

import './config/db';
import constants from './config/constants';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mocks from './mocks';

// Настрой graphQL
// const GRAPHQL_PORT = 8080;

const app = express();
app.use(bodyParser.json());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// const executableSchema = makeExecutableSchema({
//   typeDefs: Schema,
//   resolvers,
// });

// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

// app.use('/graphql', bodyParser.json(), graphqlExpress({
//   schema: executableSchema,
//   context: {},
// }));

// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
  }),
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress({
    schema,
  }),
);


const graphQLServer = createServer(app);

mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App listen to port: ${constants.PORT}`);
    }
  });
});