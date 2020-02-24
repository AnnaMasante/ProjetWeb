var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '4437',
    database : 'projet_web'
});

connection.connect(function (err) {
    if(err)
        throw err;
    console.log('Connexion effectuée');
});

module.exports = connection;