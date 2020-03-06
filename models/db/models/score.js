const {connection} = require('../index');
const {DataTypes} = require("sequelize");
const Test = require('./test');
const Personne = require('./personne')
const Resultat = require('./resultat')

const Score = connection.define('Score', {
    idScore: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score:{
        type: DataTypes.INTEGER,
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
        name: 'idPers',
        allowNull: false,
    }
})
/*Score.belongsTo(Resultat,{
    onDelete : 'CASCADE',
    foreignKey:{
        name : 'idResultat',
        allowNull : false,

    }
});*/
module.exports = Score;