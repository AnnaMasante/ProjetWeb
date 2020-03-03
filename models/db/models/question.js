const {connection} = require('../index');
const {DataTypes} = require("sequelize");

const Question = connection.define('Question', {
    idQuestion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libelleQuestion: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
});



module.exports = Question;