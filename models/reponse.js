const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'bdd.sqlite'
  })
    const Reponse = sequelize.define(
    'Reponse', {
        idReponse: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        numReponse:{
            type:Sequelize.INTEGER
        },
    });

    Reponse.associate = function(tables){
        tables.Reponse.belongs(tables.Question,
            {foreignKey:'idQuestion'})
    }
    
    exports.createReponse = async ({idQuestion,idReponse,numReponse}) => {
        return await Reponse.create({idQuestion,idReponse,numReponse});
      };
      

    Reponse.sync()
        .then(() => console.log('Table de Question créée'))
        .catch(err => console.log('Oups ça ne marche pas'));

    return Reponse;
