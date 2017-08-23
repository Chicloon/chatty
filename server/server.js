const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);

import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import cors from 'cors';

// const schema = require('./schema/schema');

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// import schema from './schema/schema';

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://localhost:27017/auth';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));


  app.use(cors('*'));
// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.


const GRAPHQL_PORT = 4000;
const GRAPHQL_PATH = '/graphql';
const SUBSCRIPTIONS_PATH = '/subscriptions';


//`context` must be an object and can't be undefined when using connectors

app.use('/graphql', bodyParser.json(), 
  graphqlExpress(req => ({
  
  schema,
  context: req
  })),
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: GRAPHQL_PATH,
  subscriptionsEndpoint: `ws://localhost:${GRAPHQL_PORT}${SUBSCRIPTIONS_PATH}`,
}));

const graphQLServer = createServer(app);

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`);
  console.log(`GraphQL Subscriptions are now running on ws://localhost:${GRAPHQL_PORT}${SUBSCRIPTIONS_PATH}`);
});

// eslint-disable-next-line no-unused-vars
const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
}, {
  server: graphQLServer,
  path: SUBSCRIPTIONS_PATH,
});




// app.use('/graphql', expressGraphQL({
//   schema,
//   graphiql: true
// }));

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript

// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config.dev.js');
// app.use(webpackMiddleware(webpack(webpackConfig)));

// module.exports = app;
