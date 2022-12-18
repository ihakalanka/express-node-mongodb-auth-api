const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, salt),
    });

    user.save((err, user) => {
       if(err) {
           return res.status(400).send({
               status: 400,
               message: err.message,
           });
           return;
       }
       else{
        res.status(200).send({
            status: 200,
            message: 'User registered successfully',
        });
       }
    });
};

