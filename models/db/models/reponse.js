const {connection} = require('../index');
const {DataTypes} = require("sequelize");
const Question = require('./question');

const Reponse = connection.define('Reponse', {
        idReponse: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        numReponse: {
            type: DataTypes.INTEGER
        },
        idQuestion: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false,
    });

Reponse.belongsTo(Question, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'idQuestion',
        allowNull: false,
    }
});

module.exports = Reponse;