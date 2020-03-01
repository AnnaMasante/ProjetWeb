module.exports = (sequelize,DataTypes) =>{
    const Question = sequelize.define(
    'Question', {
        idQuestion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    Question.associate = function(tables){
        tables.Question.belongs(tables.Test,
            {foreignKey:'idTest'})
    }

Question.sync()
    .then(() => console.log('Table de Question créée'))
    .catch(err => console.log('Oups ça ne marche pas'));

    return Question;
}