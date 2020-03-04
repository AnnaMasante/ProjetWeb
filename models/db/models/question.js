const {connection} = require('../index');
const {DataTypes} = require("sequelize");
const Test = require('./test');

const Question = connection.define('Question', {
    idQuestion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numQuestion:{
        type: DataTypes.INTEGER
    },
    libelleQuestion: {
        type: DataTypes.STRING
    },
    idTest:{
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false,
});

Question.belongsTo(Test, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'idTest',
        allowNull: false,
    }
});


module.exports = Question;