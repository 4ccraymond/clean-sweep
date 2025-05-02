const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {type: String, requires: true},
    password: {type: String, required:true}
});

module.exports = mongoose.model('User', UserSchema);