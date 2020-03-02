const Sequelize = require('sequelize')
const Test = require('./test')
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'bdd.sqlite'
  })

  module.exports = (sequelize, DataTypes) => {
    var Question = sequelize.define(
        'Question', {
            idQuestion: {
                type: Sequelize.STRING,
                primaryKey: true,
                autoIncrement: true
            },
    
            libelleQuestion:{
                type:Sequelize.STRING
            }
        }, {
            classMethods:{
                associate: function(models){
                    Question.belongs(Test,
                        {foreignKey:'idTest'})
                    hasMany(Reponse,
                        {foreignKey:'idReponse'})
                }
            }
            
        })
        return Question
    };
    
        
            
         
        /*exports.createQuestion = async ({idTest,idQuestion,numQuestion}) => {
            associate()
            return await Question.create({idTest,idQuestion,numQuestion});*/

   /* Question.sync()
        .then(() => console.log('Table de Question créée'))
        .catch(err => console.log('Oups ça ne marche pas'));
        */

    //return Question;
