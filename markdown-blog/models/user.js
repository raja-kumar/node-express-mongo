const mongoose = require('mongoose');
const marked = require('marked');
const slugify  = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    mailId: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);