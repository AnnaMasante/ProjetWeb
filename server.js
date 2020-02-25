const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const sequelize = new Sequelize({
    database:'projet_web',
    username:'root',
    password:'4437',
    dialect:'mysql',
});

//check database connection
sequelize
    .authenticate()
    .then(()=>console.log('Connexion établie ! '))
    .catch(err=> console.error('OUPS t es pas connectée ',err));

app.get('/', function(request, response) {
    console.log('Express est là !');
    response.sendFile(path.join(__dirname + '/views/login.html'));
});

//create user Model
const Personne = sequelize.define(
    'Personne',{
        idPers:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        prenom:{
            type:Sequelize.STRING
        },
        nom:{
            type:Sequelize.STRING
        },
        numTel:{
            type:Sequelize.INTEGER
        },
        enRecherche:{
            type:Sequelize.TINYINT,
            defaultValue:0
        },
        mail:{
            type:Sequelize.STRING
        },
        mdp:{
            type:Sequelize.STRING
        },
        sexe:{
            type:Sequelize.STRING
        }
    });

Personne.sync()
    .then(()=>console.log('Table de Personne créée'))
    .catch(err => console.log('Oups ça ne marche pas'));

//Fonctions d'aide
const createUSer = async({idPers,prenom,nom,numTel, enRecherche,mail,mdp,sexe})=>{
    return await Personne.create({idPers,prenom,nom,numTel, enRecherche,mail,mdp,sexe});
};

const getAllUsers=async()=>{
    return await Personne.findAll();
};

const getUser = async obj => {
    return await Personne.findOne({
        where:obj,
    });
};
    //On démarre le serveur
app.listen(3000, function(){
    console.log('Express running sur le port 3000');
});