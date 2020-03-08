
const {Test, Question, Reponse, Resultat,Score} = require("../models/db/models");
const models = require('./db/models/score')
const createScore = async ({idScore,score,idTest,idPers}) =>{
    return await Score.create({idScore,score,idTest,idPers})
}
/*const getResultat = async obj => {
    return await Resultat.findOne({
        where : obj,
    })
}*/
const getTest = async obj => {
    return await Test.findOne({
        where: obj,
    });
  };
module.exports = {
    
    score: async function(req,res){
    //on récupère les réponses pour chaque question
    var scoreee = 0
    var const1 = req.body
    for(i=1;i<5;i++){
        const1 = req.body[i]
        scoreee += parseInt(const1,10)
    }
    var idT = req.params.idTest
    console.log('kkkkkkkkkkkkkkkkkkk\n')
    console.log(scoreee)
    console.log('\n')

    await createScore({
        score : scoreee,
        idTest : idT,
        idPers : req.Personne.idPers 
    })

    //console.log(this.getLibelleScore(req,res))
    res.redirect('/profil')
    //res.render('profil',{isAdmin: req.Personne.isAdmin, user:req.Personne})
    },

    getLibelleScore : async function(req,res){
        let idPersonne = req.Personne.idPers
        let AllScore = await Score.findAll({
            attributes : ['idTest','idPers','score'],
            where:{idPers : idPersonne}
        }) //je récupère tous les Scores de la personne connectée
        let libelleResTest = []
        let libelleTest = []
        for(i=0;i<AllScore.length;i++){
            let idT = AllScore[i].idTest
            let TestInfo = await Test.findOne({
                attributes : ['idTest','libelleTest','res1','res2','res3','res4'],
                where : {idTest : idT,
                }
            })
            libelleTest.push(TestInfo.libelleTest)

            if(AllScore[i].score<5){
                libelleResTest.push(TestInfo.res1)
            }
            else if(AllScore[i].score<9){
                libelleResTest.push(TestInfo.res2)
            }else if(AllScore[i].score<13){
                libelleResTest.push(TestInfo.res3)
            }else{
                libelleResTest.push(TestInfo.res4)
            }
        }
        res.render('mesResultats',{libelleResTest, libelleTest,isAdmin : req.Personne.isAdmin}) 
    },
    getLibelleTest : async function(req,res){
        let idPersonne = req.Personne.idPers
        let AllTest = await Test.findAll({})
        console.log(AllTest)
        res.render('listeTest',{AllTest,isAdmin : req.Personne.isAdmin}) 
    }
    
}