'use strict';

const morgan = require('morgan');
const uuid = require('uuid/v4');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');

const staticPath = './public';

let users = {};
let signedUsers = {};

const app = express();
app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use('/', express.static(staticPath));
app.use(body.json());
app.use(cookie());

app.post('/auth/signup', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    if(!username || !email || !password){
        const error = 'not valid';
        res.status(400).json({error});
    }

    if(!users[username]){
        users[username] = [password, email];

        const id = uuid();
        signedUsers[id] = username;

        res.cookie('id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
        res.json({id});
    }else {
        const error = 'User already exists';
        res.status(400).json({error});
    }
});

app.post('/auth/me', (req, res) => {
    const id = res.cookies['id'];

    if(id){
        const username = signedUsers[id];
        res.json(username);
    }else{
        res.status(401).end();
    }
});

app.use('*', (req, res) => {res.status(404).send('Not found')});

app.listen(app.get('port'), () => {
    console.log('Started');
});
