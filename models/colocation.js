module.exports = (sequelize, DataTypes) =>{
    const Colocation = sequelize.define(
        'Colocation',{
            idColoc:{
                idColoc:Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });

        Colocation.associate = function(tables){
            tables.Colocation.hasMany(tables.Personne,
                {foreignKey : 'idPersonne'})
        }
    Colocation.sync()
        .then(() => console.log('Table de Question créée'))
        .catch(err => console.log('Oups ça ne marche pas'));

        return Colocation;
    }