require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"))
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});
