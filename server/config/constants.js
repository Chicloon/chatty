export default {
  PORT: process.env.PORT || 4000,
  DB_URL: 'mongodb://localhost/auth',
  GRAPHQL_PATH: '/graphql',
  SUBSCRIPTIONS_PATH: '/subscriptions',
  JWT_SECRET: 'thisisasecret',
};