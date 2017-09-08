const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Yes');
});

app.get('*', (req, res) => {
    res.status(404).send('Nope');
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Started');
});