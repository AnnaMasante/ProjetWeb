const {connection} = require('../index');
const {DataTypes} = require("sequelize");
const Personne = require('./personne');

const Test = connection.define('Test', {
    idTest: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nbQuestions: {
        type: DataTypes.INTEGER,
        defaultValue: 20
    }
}, {
    timestamps: false,
});

module.exports = Test;