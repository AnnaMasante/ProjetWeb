const models = require("../models/db/models")


const getTest = (req, res, next) => {
    let testId = req.params.idTest
    var result = models.Test.findOne({
        attributes:['idTest','libelleTest'],
        where:{idTest : testId}
    })
    .then(async function(result){
        if(result){
            
            //console.log(testId)
            var test = await models.Question.findAll({
                attributes:['idQuestion','libelleQuestion','numQuestion','idTest'],
                where:{idTest : testId}
            })
            console.log(test)
            var rep = []
            for(i=0; i<test.length;i++){
                var k = test[i].idQuestion   
                rep[i] = await models.Reponse.findAll({
                    attributes:['idReponse', 'numReponse','libelleReponse','idQuestion'],
                    where:{idQuestion : k}
                })
            }
            console.log(rep)
            // result : tableau info du test
            // test : tableau des questions [Question{},...]
            // rep : tableau de 4 cases de 4 réponses [ [Reponse{},..],[...]]
            res.render('hubert',{isAdmin : req.Personne.isAdmin,result : result, test,rep})

        }else{
            res.status(404)
            res.render('profil')
        }
    }).catch(function(err){
        console.error(err)
        res.status(500).send({error: 'Internal server error'})
    })
}


module.exports = {getTest}