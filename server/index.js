import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';

import schema from './schema/schema';
const app = require('./server');

// const graphQLServer = createServer(app);

// const PORT = 4000;
// const SUBSCRIPTIONS_PATH = '/subscriptions';


// graphQLServer.listen(PORT, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     new SubscriptionServer({
//       schema,
//       execute,
//       subscribe
//     }, {
//         server: graphQLServer,
//         path: SUBSCRIPTIONS_PATH
//       })

//     console.log(`App listen to port: ${PORT}`);
//   }
// });

// app();

// app.listen(4000, () => {
//   console.log('Listening');
// });