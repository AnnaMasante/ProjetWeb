var mysql = require('mysql');
const sequelize = require('sequelize')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '4437',
    database : 'projet_web'
})
/*
let connection = new sequelize.Sequelize({
    dialect:'sqlite',
    storage:'db.sqlite'
})

connexion.authenticate().then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.error('Unable to connect to database');
    console.error(err);
});

*/
connection.connect(function (err) {
    if(err)
        throw err;
    console.log('Connexion effectuée');
});

module.exports = connection;