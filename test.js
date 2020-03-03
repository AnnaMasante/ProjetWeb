const db = require('./models/db');

db.connect().then(() => {
    console.log('Connected !');
}).catch((e) => {
    console.error(e);
});