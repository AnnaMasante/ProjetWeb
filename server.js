const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');
const app = express();
const check = require('./controllers/verifRegister');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Strategy web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received ', jwt_payload);
    let user = getUser({id: jwt_payload.id});
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

//use the strategy
passport.use(strategy);


app.use(passport.initialize());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'bdd.sqlite'
});

//check database connection
sequelize
    .authenticate()
    .then(() => console.log('Connexion établie ! '))
    .catch(err => console.error('OUPS t es pas connectée ', err));

app.get('/', function (request, response) {
    console.log('Express est là !');
    response.sendFile(path.join(__dirname + '/views/login.html'));
});

//create user Model
const Personne = sequelize.define(
    'Personne', {
        idPers: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prenom: {
            type: Sequelize.STRING
        },
        nom: {
            type: Sequelize.STRING
        },
        numTel: {
            type: Sequelize.INTEGER
        },
        enRecherche: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        mdp: {
            type: Sequelize.STRING
        },
        sexe: {
            type: Sequelize.STRING
        }
    });

Personne.sync()
    .then(() => console.log('Table de Personne créée'))
    .catch(err => console.log('Oups ça ne marche pas'));

//Fonctions d'aide
const createUser = async ({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe}) => {
    return await Personne.create({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe});
};

const getAllUsers = async () => {
    return await Personne.findAll();
};

const getUser = async obj => {
    return await Personne.findOne({
        where: obj,
    });
};
//register route => INSCRIPTION
app.get('/register', function (req, res) {
    console.log("GET register")
    res.sendFile(path.join(__dirname + '/views/register.html'));
});

app.post('/register', function (req, res, next) {
    const {prenom, nom, numTel, enRecherche, mail, mdp, sexe} = req.body;
    const mdp1 = req.body.mdp1;
    if (mdp === mdp1) {
        if (check.checkAll(prenom, nom, numTel)) {
            createUser({prenom, nom, numTel, enRecherche, mail, mdp, sexe}).then(Personne =>
                res.sendFile(path.join(__dirname + '/views/success.html'))
            )
        } else {
            res.json({Personne, msg: "Elements incorrects"})
        }
    } else {
        res.json({Personne, msg: "Mots de passe invalides"});
    }
    //console.log({prenom, nom, numTel, enRecherche, mail, mdp, mdp1, sexe});
});
//LOGIN => ROUTE

app.post('/login', async function (req, res, next) {
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    //console.log(mdp.mdp);
    if (mail && mdp) {
        let user = await getUser({mail});
        if (!user) {
            res.status(401).json({msg: "Utilisateur non trouvé", user});
        }
       // console.log(user.mdp);
        //console.log(mdp);
        if (mdp!=null && user.mdp === mdp ) {
            let payload = {idPers: user.idPers};
           // console.log(payload);
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.sendFile(path.join(__dirname + '/views/success.html'));
        } else {
            res.status(401).json({msg: "Mot de passe incorrecte"});
        }
    }
});
app.get('/login', function (req, res) {
    console.log("GET login")
    res.sendFile(path.join(__dirname + '/views/login.html'));
});


//On démarre le serveur
app.listen(3000, function () {
    console.log('Express running sur le port 3000');
});

