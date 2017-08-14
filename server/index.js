const app = require('./server');

import test from './test';




app.listen(4000, () => {
  console.log('Listening');
});

test();