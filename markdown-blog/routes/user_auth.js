const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const session = require("express-session");

router.use(session({secret: "Your secret key"}));

router.get('/signup', (req, res) => {
    res.render("user_auth/signup");
});

router.post('/signup', async (req, res) => {
    if(!req.body.email || !req.body.password){
        res.status("400");
        res.send("invalid deails");
    }
    else{
        // check if mail id is present already

        const user = await User.findOne({mailId : req.body.email});

        if (user){
            res.render('user_auth/login', {message : "email id exists. Please login"});
        }
        else{
            let user = new User();
            user.name = req.body.name;
            user.mailId = req.body.email;
            user.password = req.body.password;
            user = user.save();

            session.user = user;
            res.redirect('/user_auth/login');
        }
        
    }
});

router.get('/login', (req, res) => {
    res.render("user_auth/login", {message : " "});
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({mailId : req.body.email});

    if (user.password === req.body.password){
        req.session.user = user;
        res.redirect('/');
    }
    else{
        res.render('user_auth/login', {message: 'login id or password is wrong'});
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(){
        console.log("user logged out.")
     });

     res.redirect('/');
});

module.exports = router;