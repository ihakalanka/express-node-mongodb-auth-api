const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, (err, decode) => {
            if(err){
                return res.status(400).send({
                    status: 400,
                    message: "Unauthenticated "+err.message,
                });
            }
            else{
                User.findOne({
                    id: decode.id
                }).exec((err, user) => {
                    if(err){
                        return res.status(400).send({
                            status: 400,
                            message: "Unauthenticated "+err.message,
                        });
                    }
                    else{
                        next();
                    }
                });
            }
        });
    }
    else{
        return res.status(400).send({
            status: 400,
            message: "Unauthenticated",
        });
    }
};


const checkPermission = (req, res, next) => {
    if(req.user.permission === "write"){
        next();
    }
    else{
        return res.status(400).send({
            status: 400,
            message: "Unauthorized",
        });
    }
};

module.exports = verifyToken;