var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'projet_web',
  host: "localhost",
  user: "root",
  password: "4437"
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
