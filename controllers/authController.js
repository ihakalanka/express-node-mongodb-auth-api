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
        password: req.body.password,
    });

    if(!user.firstName || !user.lastName || !user.email || !user.role || !user.password){
        return res.status(400).send({
            status: 400,
            message: 'All fields are required',
        });
    }

    if(user.password){
        let err = {};
        const isValid = verifyPassword(user.password, err);
        if(!isValid){
            return res.status(400).send({
                status: 400,
                message: err.message,
            });
        }
    }

    user.password = bcrypt.hashSync(user.password, salt);

    user.save((err, user) => {
       if(err) {
           return res.status(400).send({
               status: 400,
               message: "This email already exists " + err.message
           });
       }
       else{
        res.status(200).send({
            status: 200,
            message: 'User registered successfully',
        });
       }
    });
};

const verifyPassword = (password,err) => {
    if(password.length < 8){
        err.message = "Password must be at least 8 characters";
        return false;
    }
    else if(password.length > 20){
        err.message = "Password must be less than 20 characters";
        return false;
    }
    else if(password.search(/[a-z]/i) < 0){
        err.message = "Password must contain at least one letter";
        return false;
    }
    else if(password.search(/[0-9]/) < 0){
        err.message = "Password must contain at least one digit";
        return false;
    }
    else if(password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0){
        err.message = "Password must contain at least one special character";
        return false;
    }
    else if(password.search(/\s/) != -1){
        err.message = "Password must not contain spaces";
        return false;
    }
    else if(password.search(/[A-Z]/) < 0){
        err.message = "Password must contain at least one capital letter";
        return false;
    }
    else if(password.search(/[a-z]/) < 0){
        err.message = "Password must contain at least one simple letter";
        return false;
    }
    else{
        return true;
    }
}



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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }, 
        process.env.SECRET_KEY, {
            expiresIn: 86400,
        });

        res.status(200).send({
            status: 200,
            accessToken: token,
            message: 'User logged in successfully',
        });
    });
};

/* exports.logout = async (req, res) => {
    try{
        let bearerToken = req.headers.authorization;
        if(!bearerToken){
            res.json({ 
                message: "There is no token provided in the header" 
            });
            return;
        }
        else{
            jwt.sign(bearerToken, process.env.SECRET_KEY, {expiresIn: 1}, (func, err) => {
                if(func){
                    res.json({ 
                        message: "User logged out successfully" 
                    });
                }
                else{
                    res.json({ 
                        message: err.message 
                    });
                }
            });
        }
    }
    catch(err){
        res.json({ 
            message: "Error with logout process "+ err.message 
        });
    }
}; */