require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));


app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});
