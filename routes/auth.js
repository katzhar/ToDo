const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
let Users = require('../models/users');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    Users.findOne({ login: req.body.login }, async (err, user) => {
        if (err) throw err
        if (!user)
            return res.send({ msg: 'No such user in the DataBase' });
        else if (user) {
            await bcrypt.compare(req.body.password, user.password, async (err, psswd) => {
                if (err) throw err
                if (!psswd)
                    return res.send({ msg: 'Incorrect password' });
                return res.status(200).json(data)
            });
        }
    });
});

module.exports = router;