module.exports = (sequelize,DataTypes) => {
    const Personne = sequelize.define(
    'Personne', {
        idPers: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prenom: {
            type: Sequelize.STRING
        },
        nom: {
            type: Sequelize.STRING
        },
        numTel: {
            type: Sequelize.INTEGER
        },
        enRecherche: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        mdp: {
            type: Sequelize.STRING
        },
        sexe: {
            type: Sequelize.STRING
        },
        isAdmin:{
            type: Sequelize.TINYINT,
            defaultValue:0
        }
    });
  
    Personne.sync()
    .then(() => console.log('Table de Personne créée'))
    .catch(err => console.log('Oups ça ne marche pas'));


    Personne.associate = function(tables){
        tables.Personne.belongsTo(tables.Colocation,
            {foreignKey:'idColoc'})
    }
    /*
    const createUser = async ({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe}) => {
        return await Personne.create({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe});
      };
      
      const getAllUsers = async () => {
        return await Personne.findAll();
      };
      
      const getUser = async obj => {
        return await Personne.findOne({
            where: obj,
        });
    }*/
    return Personne;
}
