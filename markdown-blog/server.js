const express = require('express');
const app = express();
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://localhost/my_db');

app.get('/', async function(req, res){
    let articles = await Article.find().sort({createdAt : "desc"});
    res.render('articles/index' , {articles: articles});
});

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);

app.listen(8080);