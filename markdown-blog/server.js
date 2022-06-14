const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const userAuthRouter = require('./routes/user_auth');
const mongoose = require('mongoose');
const Article = require('./models/article');
var session = require('express-session');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(session({secret: "Your secret key"}));

//connect to database
mongoose.connect('mongodb://localhost/my_db');

app.get('/', async function(req, res){
    let articles = await Article.find().sort({createdAt : "desc"});
    if (req.session.user){
        res.render('user_auth/index_login', {articles: articles, user : req.session.user});
    }
    else{
        res.render('articles/index' , {articles: articles});
    }
});


app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);
app.use('/user_auth', userAuthRouter);

app.listen(8080);