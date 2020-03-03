const {connection} = require('../index');
const {DataTypes} = require("sequelize");

const Resultat = connection.define('Resultat', {
    idResultat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    libelleResultat: {
        type: DataTypes.STRING
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

module.exports = Resultat;