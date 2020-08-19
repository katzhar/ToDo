const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', authenticate.verifyUser, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
});

module.exports = router;