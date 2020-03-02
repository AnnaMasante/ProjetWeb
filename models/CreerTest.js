var Test = require("./test")
var Question = require("./question")
var Reponse = require("./reponse")
const Sequelize = require('sequelize')


module.exports = {
    creerTest: function(req,res,next){
        const {nomTest} = req.body.libelle
        const {nbQuestion} = 20
        return {nomTest,nbQuestion}
    },

    getAllQuestion: function(req,res,next){
        const{question1} = req.body.question1
        const{question2} = req.body.question2
        const{question3} = req.body.question3
        const{question4} = req.body.question4
        const{question5} = req.body.question5
        return {question1,question2,question3,question4,question5}
    },

    getAllResultat: function(req,res,next){
        const{creerResultat1} = req.body.creerResultat1
        const{creerResultat2} = req.body.creerResultat2
        const{creerResultat3} = req.body.creerResultat3
        const{creerResultat4} = req.body.creerResultat4
        return {creerResultat1,creerResultat2,creerResultat3,creerResultat4}
    },

    getAllReponse: function(req,res,next){
        const{reponse1} = req.body.reponse1
        const{reponse2} = req.body.reponse2
        const{reponse3} = req.body.reponse3
        const{reponse4} = req.body.reponse4
        return {reponse1,reponse2,reponse3,reponse4}
    },

    creerQuestion:function(req,res){   
    },

    getTest: function(req,res){
        var idTest = req.body.test
        console.log()
        createTest({idTest})
        
        var i = 1

        while(i<=5){
            var idQuestion = req.body.i
            var numQuestion = i
            Question.createQuestion({idTest,idQuestion,numQuestion})
            var j = 1
            while(j<=4){
                var rep = "reponse"+j
                var idReponse = req.body.rep
                var numQuestion = j
                var numReponse = i*j
                Reponse.createReponse({idQuestion,idReponse,numReponse})
                j++
            }
            i++
        }
        
        console.log(idTest)
        return res.render('success')

    },
    
}
function createTest(idTest){
    Test.Test.associate()
    return Test.create({idTest});
}