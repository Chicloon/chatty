/* eslint-disable no-console */

import express from 'express';
import { createServer } from 'http';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import './config/db';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import constants from './config/constants';
import middlewares from './config/middlewares';
import jwt from 'jsonwebtoken';
// import jwt from 'express-jwt';
// import mocks from './mocks';

import User from './models/User';

const app = express();

middlewares(app);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
    subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`
  }),
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  })),
);

const graphQLServer = createServer(app);

// mocks().then(() => {
graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    new SubscriptionServer({ // eslint-disable-line
      schema,
      execute,
      subscribe,
      onConnect(connectionParams, webSocket) {
        const userPromise = new Promise((res, rej) => {
          if (connectionParams.jwt) {
            jwt.verify(connectionParams.jwt, constants.JWT_SECRET,
              (err, decoded) => {
                if (err) {
                  rej('Invalid token!')
                }
                res(User.findOne({ _id: decoded.id }))
              })
          } else {
            rej('No token!')
          }
        })

        return userPromise.then(user => {
          if (user) {
            console.log(user.username);
            // console.log(webSocket);
            return { user: Promise.resolve(user) }
          }
          return Promise.reject('No User!')
        })
      },
      onDisconnect() {
        // console.log(this.req)
        console.log('disconnected');
      }
      
    }, {
        server: graphQLServer,
        path: constants.SUBSCRIPTIONS_PATH
      })

    console.log(`App listen to port: ${constants.PORT}`);
  }
});
// });
