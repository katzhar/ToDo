require('dotenv/config');
const express = require('express');
const app = express();
const router = express.Router();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Users = require('./models/users');
const http = require('http').createServer(app);

const db = mongoose.connection;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DataBase'));

app.use(router);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

let index = require('./routes/index');
let auth = require('./routes/auth');
let signup = require('./routes/signup');
let logout = require('./routes/logout');

app.use('/index', index);
app.use('/auth', auth);
app.use('/signup', signup);
app.use('/logout', logout);

http.listen(3007, () => console.log('Server Started')); 