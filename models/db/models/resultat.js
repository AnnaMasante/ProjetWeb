const {connection} = require('../index');
const {DataTypes} = require("sequelize");
const Test = require('./test');
const Personne = require('./personne')

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
Resultat.belongsTo(Test, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'idTest',
        allowNull: false,
    }
});
/*Resultat.belongsTo(Personne, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'idPersonne',
        allowNull: false,
    }
});*/
module.exports = Resultat;