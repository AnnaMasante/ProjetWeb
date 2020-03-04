const {connection} = require('../index');
const {DataTypes} = require("sequelize");

const Personne = connection.define('Personne', {
    idPers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prenom: {
        type: DataTypes.STRING
    },
    nom: {
        type: DataTypes.STRING
    },
    numTel: {
        type: DataTypes.INTEGER
    },
    enRecherche: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    },
    mdp: {
        type: DataTypes.STRING
    },
    sexe: {
        type: DataTypes.STRING
    },
    isAdmin: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    idResultat: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false,
});

module.exports = Personne;