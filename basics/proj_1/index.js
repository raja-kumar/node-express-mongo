var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var things = require('./things.js');

var app = express();
var upload = multer();

// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

// db schema
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
 var Person = mongoose.model("Person", personSchema);


// to use templates
app.set('view engine', 'pug')
app.set('views', './views')


// to use static files
app.use(express.static('public'));

/* app.use(midd1); */

app.get('/', function(req, res, next){
    res.send('hello world');
    next();
});

/* app.use(midd1); */

// this is to understand middleware. uncomment above line to see the magic
function midd1(req, res, next){
    console.log('inside a middleware');
    next();
}

// this is to understand routing
app.use('/things', things);


// this is to understand the templating using pug
app.get('/first_template', function(req, res){
    res.render('first_view');
});

// testing static image loading
app.get('/say_hi_to_appy', function(req, res){
    res.render('test_static_image')
});

// to understand parsing and send form requests
app.get('/send_msg', function(req, res){
    res.render('form');
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());

app.post('/send_msg', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
 });

 // form to collect data for database

app.get('/person', function(req, res){
    res.render('person');
});

app.post('/person', function(req, res){
    var personInfo = req.body;
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
        res.render('show_message', {
           message: "Sorry, you provided worng info", type: "error"});
     } else {
        var newPerson = new Person({
           name: personInfo.name,
           age: personInfo.age,
           nationality: personInfo.nationality
        });
        newPerson.save(function(err, Person){
            if(err)
               res.render('show_message', {message: "Database error", type: "error"});
            else
               res.render('show_message', {
                  message: "New person added", type: "success", person: personInfo});
         });
      }
});


// Retrieving documents(rows)

app.get('/people', function(req, res){
    Person.find(function(err, response){
       res.json(response);
    });
 });

 
app.listen(3000);