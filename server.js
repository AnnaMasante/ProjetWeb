const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const check = require('./controllers/verifRegister');
const passport = require('./utils/jwt.utils');
const CreerTest = require("./models/CreerTest")
const verifToken = require("./controllers/verifToken")
const controllers = require("./controllers/usrCtrl");
const models = require('./models/connexion')
const db = require('./models/db');

db.connect().then(() => {
    console.log('Connection successful');

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.set('view engine', 'ejs');

    passport.startTheApp();


    app.get('/', function (request, response) {
        console.log('Express est là !');
        response.render('login');
    });

//create user Model

//register route => INSCRIPTION
    app.get('/register', function (req, res) {
        res.render('register')
    });

    app.post('/register', function (req, res, next) {
        return models.register(req, res, next)
    });


    app.post('/login', async function (req, res, next) {
        return models.login(req, res, next)
    });


    app.get('/profil', verifToken, controllers.getProfil, function (req, res) {
        console.log(req.Personne.isAdmin)
        //res.render('profil',{isAdmin: req.Personne.isAdmin});
    })
    /*app.get('/profil',verifToken,controllers.updateUserProfil, function(req,res){

    })*/
    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/profil/hubert', function (req, res) {
        res.render('hubert');
    })

    app.get('/profil/creerTest', verifToken, function (req, res) {
        res.render('creerTest')
    })
    app.post('/profil/creerTest', function (req, res) {
        return CreerTest.creerTest(req, res)
    })

    app.get("/profil/logout", verifToken, function (req, res) {
        return models.logout(req, res)
    })

    var port = process.env.PORT || 3000
//On démarre le serveur
    app.listen(port, function () {
        console.log('Express running sur le port 3000');
    });
}).catch((e) => {
    console.error('Unable to connect to database.');
    console.error(e);
    process.exit(1);
});

