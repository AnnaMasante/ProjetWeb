const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const check = require('./controllers/verifRegister');
const passport = require('./utils/jwt.utils');
const CreerTest = require("./models/CreerTest")
const verifToken = require("./controllers/verifToken")
const usrCtrl = require("./controllers/usrCtrl");
const testCtrl = require("./controllers/testCtrl")
const models = require('./models/connexion')
const calculTest = require('./models/calculTest')
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


    app.get('/profil', verifToken, usrCtrl.getProfil, function (req, res) {
        //.log(req.Personne.isAdmin)
        res.render('profil',{isAdmin: req.Personne.isAdmin});
    })

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/profil/creerTest', verifToken, function (req, res) {
        res.render('creerTest')
    })
    app.post('/profil/creerTest', verifToken, function (req, res) {
        return CreerTest.creerTest(req,res)
    })

    app.get("/profil/logout", verifToken, function (req, res) {
        return models.logout(req, res)
    })

    app.get('/listeTest/:idTest',verifToken,testCtrl.getTest);

    app.get('/profil/hubert/:idTest', function (req, res) {
        return testCtrl.getTest(req,res)
    })
    app.post('/profil/hubert/:idTest',verifToken,function(req,res){
        return calculTest.score(req,res)
    })

    app.get('/profil/resultat',verifToken,function(req,res){
        return calculTest.getLibelleScore(req,res)
    })
    
    app.get('/profil/modifierTest/:idTest',verifToken,function(req,res){
        return testCtrl.modifTest(req,res)
    })
    app.post('/profil/modifierTest/:idTest',verifToken,function(req,res){
        return CreerTest.updateTest(req,res)
    })
    //On démarre le serveur
    var port = process.env.PORT || 3000
    app.listen(port, function () {
        console.log('Express running sur le port 3000');
    });    
});
