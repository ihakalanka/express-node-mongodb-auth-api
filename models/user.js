const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        lowercase: true,
        trim: true,
        required: [true, 'Please enter your email'],
        validate: {
            validator: function (value) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value);
            },
            message: 'Please enter a valid email',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: [true, 'Please enter your role'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);