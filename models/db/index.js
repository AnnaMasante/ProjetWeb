const Sequelize = require('sequelize').Sequelize;

const connection = new Sequelize({
    dialect:'sqlite',
    storage:'flo.sqlite',
});

const connect = () => {
    require('./models');
    return connection.authenticate().then(() => connection.sync());
};

module.exports = {
    connection,
    connect,
};