const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  login: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
})

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;