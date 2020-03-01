const jwt = require("jsonwebtoken");
const models = require("../models/connexion")

const getProfil = (req,res,next) => {
    let userId = req.Personne.idPers
    console.log(models.Personne)
    models.Personne.findOne({
    attributes:['idPers','nom','prenom','mail'],
    where:{idPers : userId }
    }).then(function(user){
        if(Personne){
            res.status(201)
            res.render('profil', {user : user})
        }else{
            res.status(404)
            res.render('profil')
        }
    }).catch(function(err){
    res.status(500)
    })    
}

module.exports = {getProfil}