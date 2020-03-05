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
    console.log(libelleTest)
    return await Test.create({idTest,libelleTest,nbQuestions})
}

const getTest = async obj => {
    return await Test.findOne({
        where: obj,
    });
  };
const getQuestion = async obj => {
    return await Question.findOne({
        where : obj,
    })
}
module.exports = {
    creerTest: async function(req,res){
        
        var libelleTest = req.body.test
        
        if(libelleTest == null){
            res.json('Libelle Vide impossible')
            res.redirect('/profil/creerTest')
        }
        numQuestion = 20
        await createTest({
            libelleTest:libelleTest,
            numQuestion:numQuestion})
        var test = await getTest({libelleTest})
        var idTest = test.idTest
        
        var numQuestion = 1
        
        var libelleQuestion = req.body.q1        
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var question = await getQuestion({libelleQuestion})
        var k1 = question.idQuestion

        numQuestion = 2
        libelleQuestion = req.body.q2
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var question = await getQuestion({libelleQuestion})
        var k2 = question.idQuestion
        
        numQuestion = 3
        libelleQuestion = req.body.q3
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var question = await getQuestion({libelleQuestion})
        var k3 = question.idQuestion
        
        numQuestion = 4
        libelleQuestion = req.body.q4
        await createQuestion({numQuestion,libelleQuestion,idTest})
        var question = await getQuestion({libelleQuestion})
        var k4 = question.idQuestion

        var i = 1
        
        var numReponse = 16
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
            var j = i
            libelleReponse = j.toString()
            libelleReponse = req.body[libelleReponse]
            await createReponse({numReponse,libelleReponse,idQuestion})
            i++
        }
        return res.status(200).redirect('/profil')
    }
}
