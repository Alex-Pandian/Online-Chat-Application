const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        require: true
    },
    fullName : {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    about: {
        type: String,
    },
    profilePhoto: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);