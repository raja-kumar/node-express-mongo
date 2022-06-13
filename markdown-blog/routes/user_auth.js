const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.get('/signup', (req, res) => {
    res.render("user_auth/signup");
});

router.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password){
        res.status("400");
        res.send("invalid deails");
    }
    else{
        // check if mail id is present already

        const user = await User.findOne({mailId : req.body.email});

        if (user){
            res.send("user already exist. Please login or use a different email");
        }
        else{
            let user = new User();
            
            user.name = req.body.name;
            user.mailId = req.body.email;
            user.password = req.body.password;
            user = user.save();

            res.redirect('/user_auth/login');
        }
        
    }
});

router.get('/login', (req, res) => {
    res.render("user_auth/login");
});

router.post('/validate', async (req, res) => {
    const user = await User.findOne({mailId : req.body.email});

    if (user.password === req.body.password){
        res.redirect('/');
    }
    else{
        res.send('login id or password is wrong');
    }
});

module.exports = router;