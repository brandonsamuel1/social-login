require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const ejs = require('ejs');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/social-loginDB', {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(() => console.log('Error connecting to MongoDB...'));
mongoose.set('useCreateIndex', true);


// Creating DB Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
 
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', (req, res) => {
    User.register({username: req.body.username, email: req.body.email}, req.body.password, function(err, user) {
        if(err) {
            console.log('Error registering user....', err)
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/success');
            });
        }
    });
});


app.listen(8080, (req, res) => {
    console.log('Server started on port 8080...');
});
