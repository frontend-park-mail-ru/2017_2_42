const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.send('Nope', 404);
});

app.listen('8080', () => {
    console.log('Started');
});
