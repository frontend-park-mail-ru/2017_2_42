'use strict';

const morgan = require('morgan');
const express = require('express');

const staticPath = './public';

const app = express();
app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'));

app.use('/static', express.static(staticPath));

app.use('*', express.static(staticPath));


app.listen(app.get('port'), () => {
  console.log('server started');
});
