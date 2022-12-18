const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split)[1], 'procces.env.SECRET_KEY', (err, decode) => {
            if(err)req.user = undefined;
            User.findOne({
                _id: decode._id
            })
            .exec((err, user) => {
                if(err){
                    return res.status(400).send({
                        status: 400,
                        message: err.message,
                    });
                }
                else{
                    req.user = user;
                    next();
                }
            })
        }
    }
    else{
        req.user = undefined;
        next();
    }
};

module.exports = verifyToken;