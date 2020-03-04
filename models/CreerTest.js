const {Test, Question, Reponse} = require("../models/db/models");

//Fonctions aide

const createQuestion = async ({idQuestion,numQuestion,libelleQuestion,idTest}) => {
    return await Question.create({idQuestion,numQuestion,libelleQuestion,idTest})
}
const createReponse = async ({idReponse,numReponse,libelleReponse,idQuestion}) =>{
    return await Reponse.create({idReponse,numReponse,libelleReponse,idQuestion})
}
const createTest = async ({idTest,libelleTest,nbQuestions}) =>{
    console.log('bbbbbbbbbbbbbbbbbbbbbbb')
    return await Test.create(idTest,libelleTest,nbQuestions)
}

const getTest = async obj => {
    return await Test.findOne({
        where: obj,
    })
}
const getQuestion = async obj => {
    return await Question.findOne({
        where : obj,
    })
}
module.exports = {
    creerTest: async function(req,res){
        var libelleTest = req.body.test
        
        await createTest({libelleTest})
        
        var T = getTest({libelleTest})
        console.log(T)
        var idTest = Test.idTest
        var numQuestion = 1
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        var libelleQuestion = req.body.q1
        console.log(libelleQuestion)
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var k1 = Question.idQuestion
        numQuestion = 2
        libelleQuestion = req.body.q2
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var k2 = Question.idQuestion
        numQuestion = 3
        libelleQuestion = req.body.q3
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var k3 = Question.idQuestion
        numQuestion = 4
        libelleQuestion = req.body.q4
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var k4 = Question.idQuestion
        res.status(201).redirect('/profil')

        var j = 1
        
        while(i<17){
            if (i<5){
                idQuestion = k1
            }
            if(i>4 && i<9){
                idQuestion = k2
            }
            if(i>8 && i<13){
                idQuestion = k3
            }
            if(i>12){
                idQuestion = k4
            }
            numReponse = i%4
            if(numReponse==0){
                numReponse = 1
            }
            libelleReponse = 
            await createReponse({idReponse,numReponse,libelleReponse,idQuestion})
        }
    }
}

