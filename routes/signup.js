require('dotenv/config');
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Users = require('../models/users');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', (req, res) => {
    const emailChecker = email => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const pwdChecker = password => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        return regex.test(password);
    };

    async function validation(data) {
        if (await Users.exists({ email: data.email }))
            return res.send({ msg: 'this email is already in use' });
        if (!emailChecker(data.email))
            return res.send({ msg: 'incorrect format of email' });
        if (await Users.exists({ login: data.login }))
            return res.send({ msg: 'this login is already in use' });
        if (!pwdChecker(data.password))
            return res.send({ msg: 'Your password must be at least 6 characters long, be of mixed case and also contain a digit or symbol.' })
        else {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            let user = new Users({
                login: data.login,
                email: data.email,
                password: hashedPassword,
            })
            user.save();
        }
    }
    console.log(req.body)
    validation(req.body);
});

module.exports = router;