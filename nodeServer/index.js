'use strict';

const morgan = require('morgan');
const express = require('express');

const staticPath = './public';

const app = express();
app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'));

app.use('/', express.static(staticPath));

app.use('*', (req, res) => {
  res.status(404).send('Not found')
});

app.listen(app.get('port'), () => {
  console.log('server started');
});
