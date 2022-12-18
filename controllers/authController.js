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

exports.login = async (req, res) => {
    User.findOne({
        email: req.body.email,
    })
    .exec((err, user) => {
        if(err){
            return res.status(400).send({
                status: 400,
                message: err.message,
            });
        }
        if(!user){
            return res.status(404).send({
                status: 404,
                message: 'User not found',
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                status: 401,
                accessToken: null,
                message: 'Invalid password',
            });
        }

        const token = jwt.sign({ 
            id: user.id, 
        }, 
        process.env.SECRET_KEY, {
            expiresIn: 86400,
        });

        res.status(200).send({
            status: 200,
            user: {
                id: user._id,
                fullName: user.firstName + user.lastName,
                email: user.email,
                role: user.role,
            },
            accessToken: token,
            message: 'User logged in successfully',
        });
    });
};