const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        console.log("in register");
        console.log(req.body);
        const user = new User(req.body);

        user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Succesfully registered");
            res.json({
                message: "Successfully registered",
                user: newUser
            })
        })
        .catch((err) => {
            console.log("register not successful");
            res.status(400).json(err)
        })
    },

    login: (req, res) =>{
        User.findOne({ email: req.body.email})
            .then((userRecord) => {
                if(userRecord === null){
                    res.status(400).json({message: "Invalid login attempt"});
                } else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid) {
                                console.log('password is valid');
                                console.log(userRecord);
                                console.log(process.env.JWT_SECRET);
                                res.cookie("usertoken", 
                                    jwt.sign({
                                        user_id: userRecord._id,
                                        email: userRecord.email,
                                        name: userRecord.name                                    }, 
                                    process.env.JWT_SECRET),
                                    {
                                        httpOnly:true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                    
                                ).json({
                                    message:"succesfly logged in",
                                    userLoggedIn: userRecord.name                              })

                            }else{
                                res.status(400).json({message: "Invalid login attempt"});
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({message: "Invalid login attempt"});
                        })
                }
            })
            .catch((err) => {
                console.log("error with find one")
                res.status(400).json({message: "Invalid login attempt",err});
            })
    },
    logout: (req, res) => {
        console.log("logging out!");
        res.clearCookie("usertoken"); //same name as a bove for saving the cookie
        res.json({
            message:"You have successfuly logged out"
        })
    },
    getUserByEmail: (req, res) => {
        User.findOne({ email: req.query.email }) // Use req.query.email to get the email from the request URL
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                } else {
                    res.json({ user });
                }
            })
            .catch((err) => {
                console.log("Error while getting user by email", err);
                res.status(500).json({ message: "Internal server error" });
            });
    }
}