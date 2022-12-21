const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionList: {
        type: String,
        required: [true, 'Please enter your permission'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    relevantUser: {
        type: String,
        required: [true, 'Please enter your relevant user'],
    },
});