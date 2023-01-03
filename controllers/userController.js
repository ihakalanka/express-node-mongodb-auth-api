const User = require('../models/user');

exports.User = async (req, res) => {
    try {
        let bearerToken = req.headers.authorization;

        if(!bearerToken){
            res.json({ 
                message: "There is no token provided in the header" 
            });
            return;
        }
        else{
            let token = bearerToken.split(" ")[1];
            let payload = token.split(".")[1]; 
            let decode = JSON.parse(Buffer.from(payload, "base64").toString("ascii"));

            let allData = JSON.stringify(decode);
            let data = JSON.parse(allData);
            /* console.log((new Date(data.exp * 1000).toLocaleTimeString()));
            console.log((new Date().toLocaleTimeString())); */
        
            if(data.role === "admin"){
                res.json({ 
                    message: "Hi " + data.firstName + " you are an Admin" 
                });
            }
            else if(data.role === "user"){
                res.json({ 
                    message: "Hi "+ data.firstName +" you are a User" 
                });
            }
        }
    } catch (err) {
        res.json({ 
            message: "unauthorized" 
        });
    }
};

exports.Admin = async (req, res) => {
    try{
        
    }
    catch{

    }
};