/* eslint-disable no-param-reassign */

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import constants from './constants';
import { decodeToken } from '../services/auth';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

async function cookieHandle (req, res, next) {
   var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
}

export default app => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  app.use(cookieHandle);
  app.use(auth);
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: constants.GRAPHQL_PATH,
    }),
  );
  app.use(
    constants.GRAPHQL_PATH,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    })),
  );
}