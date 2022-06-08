/*
this file is to understnd the concept of routing
*/

var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();

router.get('/', function(req, res){
    res.send('hello world at things')
});

router.post('/', function(req, res){
    res.send('you are at post methods')
});

module.exports = router;