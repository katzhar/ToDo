require('dotenv/config');
const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const passport = require('passport')

app.use(router);
app.use(express.json());

const db = mongoose.connection;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DataBase'));

app.use(passport.initialize());

let index = require('./routes/index');
let signup = require('./routes/signup');
let auth = require('./routes/auth');
let logout = require('./routes/logout');

app.use('/', index);
app.use('/signup', signup);
app.use('/auth', auth);
app.use('/logout', logout);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

http.listen(3007, () => console.log('Server Started')); 