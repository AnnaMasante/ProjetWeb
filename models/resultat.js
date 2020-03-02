const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'bdd.sqlite'
  })
    const Resultat = sequelize.define(
    'Resultat',{
        idResultat:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelleResultat:{
            type:Sequelize.STRING
        },
        scoreMin:{
            type: Sequelize.INTEGER
        },
        scoreMax:{
            type:Sequelize.INTEGER
        }

    });

Resultat.sync()
    .then(() => console.log('Table de Colocation créée'))
    .catch(err => console.log('Oups ça ne marche pas'));

    Resultat.associate = function(tables){
        tables.Resultat.belongsTo(models.Test,{
            foreignKey:'idTest'
        })
    }

    return Resultat;