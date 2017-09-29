const {users, signedUsers} = require('./index');

const singup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    if (!username || !email || !password) {
        const error = 'not valid';
        res.status(400).json({error});
    }

    if (!users[username]) {
        users[username] = [password, email];

        const id = uuid();
        signedUsers[id] = username;

        res.cookie('id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});

        res.json({id});
    } else {
        const error = 'User already exists';
        res.status(409).json({error});
    }
};

module.exports = singup;