
module.exports = {
    score: function(req,res){
    //on récupère les réponses pour chaque question
    var score = 0
    var const1 = req.body
    for(i=1;i<5;i++){
        const1 = req.body[i]
        score += parseInt(const1,10)

    }
    console.log(score)

    }
}