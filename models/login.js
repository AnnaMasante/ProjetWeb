//Imports
var connection = require('../config/db');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var apiRouter = require('./apiRouter').router;


//instancier un serveur
var app=express();



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));//forcer le parse dans des objets inclus dans l'autre
app.use(bodyParser.json()); //On veut parser du json


//On configure les routes
app.get('/', function(req,res){
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1> Bonjour sur le serveur</h1>');
});

app.use('/api/',apiRouter);


//Lancement serveur
app.listen(3000,function(){
    console.log('Server en écoute');
});
/*app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/../views/login.html'));
});

app.get('/Signup',function (request,response) {
    response.sendFile(path.join(__dirname + '/../views/signup.html'));
})

app.post('/auth', function(request, response) {
    var mail = request.body.mail;https://sucuri.net/guides/owasp-top-10-security-vulnerabilities-2020/
    var mdp = request.body.mdp;
    if (mail && mdp) {
        connection.query('SELECT * FROM Personne WHERE mail = ? AND mdp = ?', [mail, mdp], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.mail = mail;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.mail + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(3000);*/