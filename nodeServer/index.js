'use strict';
/**
 * Node packages
 */
const morgan = require('morgan');
const uuid = require('uuid/v4');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');

/**
 * Handwritten packages
 */
const signup = require('./signup');

const staticPath = './public';

let users = {};
let signedUsers = {};


const app = express();
app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use(body.json());
app.use(cookie());

app.use('/', express.static(staticPath));

app.post('/api/auth/signup', signup);

app.post('/api/auth/me', (req, res) => {
    const id = res.cookies['id'];

    if (id) {
        const username = signedUsers[id];
        res.json(username);
    } else {
        res.status(401).end();
    }
});

app.post('/api/auth/login', (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;


    if (!username || !password) {
        const error = 'not valid';
        res.status(400).json({error});
    }

    if (users[username] && users[username][0] === password) {
        const id = uuid();
        signedUsers[id] = username;

        res.cookie('id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});

        res.json({id});
    } else {
        const error = 'User not exists';
        res.status(409).json({error});
    }
});

app.use('*', (req, res) => {
    res.status(404).send('Not found')
});

app.listen(app.get('port'), () => {
    console.log('Started');
});


module.exports = {users, signedUsers};
