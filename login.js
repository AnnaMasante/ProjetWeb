var connection = require('./config/db');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');



var app=express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    console.log(request.body);
    var mail = request.body.mail;
    var mdp = request.body.password;
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
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(3000);