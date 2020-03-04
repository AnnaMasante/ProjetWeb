const {connection} = require('../index');
const {DataTypes} = require("sequelize");

const Test = connection.define('Test', {
    idTest: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libelleTest:{
        type: DataTypes.STRING
    },
    nbQuestions: {
        type: DataTypes.INTEGER,
        defaultValue: 20
    }
}, {
    timestamps: false,
});


module.exports = Test;