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

    //On démarre le serveur
app.listen(3000, function(){
    console.log('Express running sur le port 3000');
});