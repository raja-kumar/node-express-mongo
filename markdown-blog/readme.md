## Introduction

This repo contains code for creating a basic markdown-blog site. 

It will help you learn the basics of:
- node.js and expressjs
- connecting express with mongodb and performing query
- understand CRUD operation

### Pre-requisite and Dependencies

To install the dependencies, run below commands from comman line.

```
git clone https://github.com/raja-kumar/node-express-mongo
```
```
cd node-express-mongo
```
```
npm install
```
### code structure
    .
    ├── views               # this contains all the ejs files, which renders the views (similar to jade or pug files). It's basically the frontend codes
    ├── routes              # similar to urls in django. it contains the request for each url and it's response
    ├── models              # create schema for your database tables here
    ├── server.js           # this is the main file which starts the server. see below for how to run
    └── README.md
    
### How to run

```
nodemon server.js
```
