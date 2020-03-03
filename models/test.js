const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'bdd.sqlite'
});

module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
        idTest: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        nbQuestions: {
            type: Sequelize.INTEGER,
            defaultValue: 20
        }
    }, {
        classMethods: {
            associate: function (models) {
                Test.hasMany(Question,
                    {foreignKey: 'idQuestion'})
                Test.hasMany(Resultat,
                    {foreignKey: 'idResultat'})
            },


        }
    });
    return Test
};


/*  Test.sync()
  .then(() => console.log('Table de Test créée'))
  .catch(err => console.log('Oups ça ne marche pas'))
*/
