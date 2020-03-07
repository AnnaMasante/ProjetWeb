const {Test, Question, Reponse, Resultat,Score} = require("../models/db/models");
//Fonctions aide

const createQuestion = async ({idQuestion,numQuestion,libelleQuestion,idTest}) => {
    return await Question.create({idQuestion,numQuestion,libelleQuestion,idTest})
}
const createReponse = async ({idReponse,numReponse,libelleReponse,idQuestion}) =>{
    return await Reponse.create({idReponse,numReponse,libelleReponse,idQuestion})
}
const createTest = async ({idTest,libelleTest,res1,res2,res3,res4,nbQuestions}) =>{
    console.log(libelleTest)
    return await Test.create({idTest,libelleTest,res1,res2,res3,res4,nbQuestions})
}
const createScore = async ({idScore,idTest,idPersonne}) =>{
    return await Score.create({idScore,idTest,idPersonne})
}
/*
const createResultat = async ({idResultat,libellleResultat,scoreMin,scoreMax,idTest,idPersonne}) =>{
    return await idResultat.create({idResultat,libellleResultat,scoreMin,scoreMax,idTest,idPersonne})
}*/

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
const getReponse = async obj => {
    return await Reponse.findOne({
        where : obj,
    })
}

const getNumQuestion = function(i){
    if(i<5){
        return 1
    }
    else if(i<9){
        return 2
    }
    else if(i<13){ 
        return 3
    }else{
        return 4
    }
}

const creerTest = async function(req,res){
        
        var libelleTest = req.body.test
        
        if(libelleTest == null){
            res.json('Libelle Vide impossible')
            res.redirect('/profil/creerTest')
        }
        numQuestion = 20
        await createTest({
            libelleTest:libelleTest,
            numQuestion:numQuestion,
            res1 : null,
            res2 : null,
            res3 : null,
            res4 : null,       
        })
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

            var libRes1 = req.body[17]
            var libRes2 = req.body[18]
            var libRes3 = req.body[19]
            var libRes4 = req.body[20]
            //on retrouve le test créé et on ajoute les résultats 
            var tt =Test.findOne({
                attributes:['idTest','res1','res2','res3','res4'],
                where:{idTest : idTest}
            })

            if(tt){
                var res1,res2,res3,res4;
                Test.update({
                    res1: (res1 ? res1 : libRes1),
                    res2: (res2 ? res2 : libRes2),
                    res3: (res3 ? res3 : libRes3),
                    res4: (res4 ? res4 : libRes4),
                    
                },
                {where :{idTest : idTest}})
                return res.status(200).redirect('/profil')
            }
            else{
                return res.status(500).json({'error': 'unable to verify test'})
            }
    }

    const updateTest = async function(req,res){
        var libTest  = req.body.test
        
        if(libTest != ""){
            var test = getTest({libelleTest})
            (await test).update({
                libelleTest:(libelleTest ? libelleTest : libTest),
            })
        }
        var idT = req.params.idTest
        //console.log(idT)
        updateQuestion(req,idT);
        updateReponse(req,idT);
        updateResultat(req,idT);

        res.redirect('/profil')
        
    }
    const updateQuestion = async function(req,idTest,test){
        lib = [req.body.q1,req.body.q2,req.body.q3,req.body.q4]
        for(i=0;i<4;i++){
            var libelleQuestion = lib[i]
            if(libelleQuestion != ''){
                var question = await Question.findAll({
                    attributes : ['idQuestion','numQuestion','libelleQuestion','idTest'],
                    where : {idTest : idTest, numQuestion : i+1}
                })
                console.log(question)
                question[0].update({
                    libelleQuestion:(libelleQuestion ? libelleQuestion : i )
                })
            }
            
        } 
    }
    const updateReponse = async function(req,idTest){
        let k1,k2,k3,k4;
        let i = 1
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
            var libReponse = req.body[libelleReponse]
            
            if(libReponse != ''){
                var numQuestion =  getNumQuestion(i)
                
                let questions = await Question.findAll({
                    attributes : ['idTest','idQuestion','numQuestion'],
                    where:{idTest : idTest,numQuestion : numQuestion},
                })
                console.log(questions[0].idQuestion)

                let reponse = await Reponse.findAll({
                    attributes : ['idReponse','numReponse','libelleReponse','idQuestion'],
                    where : {idQuestion : questions[0].idQuestion, numReponse : numReponse}

                })
                questions[0].update({
                    libelleReponse : (libelleReponse ? libelleReponse:libReponse)
                })
            }
            i++
        }
    }
    const updateResultat = async function(req,idT,res){
        var libRes1 = req.body[17]
        var libRes2 = req.body[18]
        var libRes3 = req.body[19]
        var libRes4 = req.body[20]
        //on retrouve le test créé et on ajoute les résultats 
        var test = await Test.findOne({
            attributes:['idTest','res1','res2','res3','res4'],
            where:{idTest : idT}
        })

        if(libRes1 != ""){
            test.update({
                res1: (res1 ? res1 : libRes1),
            })
        if(libRes2 != ""){
            test.update({
                res2: (res2 ? res2 : libRes2),
            })
        }
        if(libRes3 != ""){
            test.update({
                res3: (res3 ? res3 : libRes3),
            })
        }
        if(libRes4 != ""){
            test.update({
                res4: (res4 ? res4 : libRes4),
            })
        }
            
    }
}
module.exports = {createScore,creerTest,updateTest}