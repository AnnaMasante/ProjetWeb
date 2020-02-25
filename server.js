const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');
const app = express();
const check = require('./controllers/verifRegister');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true,
                notEmpty:true,
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
    console.log({prenom, nom, numTel, enRecherche, mail, mdp,mdp1, sexe});
});
//LOGIN => ROUTE

//On démarre le serveur
app.listen(3000, function () {
    console.log('Express running sur le port 3000');
});

