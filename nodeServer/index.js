const express = require('express');

const staticPath = './';

const app = express();
app.set('port', process.env.PORT || 8000);

app.use('/static', express.static(staticPath));
app.use('*', (req, res) => {res.status(404).send('Not found')});

app.listen(app.get('port'), () => {
    console.log('Started');
});
