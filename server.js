const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const check = require('./controllers/verifRegister');
let passport = require('./utils/jwt.utils');
let models = require('./models/connexion');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

passport.startTheApp();


app.get('/', function (request, response) {
    console.log('Express est là !');
    response.render('login');
});

//create user Model

//register route => INSCRIPTION
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/register.html'));
});

app.post('/register', function (req, res, next) {
    return models.register(req,res,next)
});


app.post('/login', async function(req,res,next){
    return models.login(req, res, next) 
});


app.get('/profil',function(req,res){
    res.render('profil');
})
app.get('/login', function (req, res) {
    res.render('login');
});


//On démarre le serveur
app.listen(3000, function () {
    console.log('Express running sur le port 3000');
});

