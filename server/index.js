import express from 'express';
import { createServer } from 'http';

// import resolvers from './graphql/resolvers';
// import Schema from './graphql/schema';
// import { Mocks } from './graphql/mocks';

import './config/db';
import constants from './config/constants';
import middlewares from './config/middlewares';

import mocks from './mocks';

const app = express();

middlewares(app);

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