const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionName: {
        type: String,
        required: [true, 'Please enter permission name'],
    },
    releventUser: {
        type: String,
        required: [true, 'Please enter relevent user'],
    },
});

module.exports = mongoose.model('Permission', permissionSchema);