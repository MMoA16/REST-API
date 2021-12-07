
var mongoose = require('mongoose');

var Games = mongoose.model('Games', {
    name: {
        type: String,
        index: true,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = { Games };