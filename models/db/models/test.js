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
        defaultValue: 16
    },
    res1: {
        type: DataTypes.STRING
    },
    res2: {
        type: DataTypes.STRING
    },
    res3: {
        type: DataTypes.STRING
    },
    res4: {
        type: DataTypes.STRING
    }

}, {
    timestamps: false,
});


module.exports = Test;
