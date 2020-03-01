module.exports = (sequelize,DataTypes) =>{
    const Test = sequelize.define('Test', {
        idTest: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nbQuestions:{
            type:Sequelize.INTEGER
        }
    });

    Test.associate = function(tables){
        tables.Test.hasMany(tables.Question,
            {foreignKey : 'idQuestion'})
        tables.Test.hasMany(tables.Resultat,
            {foreignKey : 'idResultat'})    
    };



Test.sync()
    .then(() => console.log('Table de Test créée'))
    .catch(err => console.log('Oups ça ne marche pas'))

    return Test;
}