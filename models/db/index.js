
const Sequelize = require('sequelize').Sequelize;

const connection = new Sequelize({
    dialect:'sqlite',
    storage:'flo.sqlite',
});
/*console.log(process.env.NODE_ENV)
console.log(process.env.DATABASE_URL)
const connection1 = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});
    */
const connect = () => {
    require('./models');
    //if(process.env.NODE_ENV === 'production'){
        //return connection1.authenticate().then(() => connection.sync());
   // }else{
        return connection.authenticate().then(() => connection.sync());
    //}
    
};

module.exports = {
    connection,
    connect,
};