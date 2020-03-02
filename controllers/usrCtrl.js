const jwt = require("jsonwebtoken");
const models = require("../models/connexion")

const getProfil = (req,res,next) => {
    let userId = req.Personne.idPers
    console.log(models.Personne)
    models.Personne.findOne({
        attributes:['idPers','nom','prenom','mail'],
        where: {idPers : userId }
    }).then(function(user){
        if(user){
            res.status(201)
            console.log(user)
            res.render('profil',{isAdmin: req.Personne.isAdmin,user : user})
        }else{
            res.status(404)
            res.render('profil')
        }
    }).catch(function(err){
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    })    
}

module.exports = {getProfil}