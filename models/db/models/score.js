const {connection} = require('../index');
const {DataTypes} = require("sequelize");
const Test = require('./test');
const Personne = require('./personne')

const Score = connection.define('Score', {
    idScore: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    scoreMin: {
        type: DataTypes.INTEGER
    },
    scoreMax: {
        type: DataTypes.INTEGER
    }

}, {
    timestamps: false,
});
Score.belongsTo(Test, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'idTest',
        allowNull: false,
    }
});
Score.belongsTo(Personne, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'idPersonne',
        allowNull: false,
    }
});
module.exports = Score;