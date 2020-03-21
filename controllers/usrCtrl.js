const jwt = require("jsonwebtoken");
const models = require("../models/db/models");
const calcultTest = require('../models/calculTest')

const getProfil = async (req,res,next) => {
    let donnes_user = await calcultTest.getLibelleScore
    console.log('\n')
    let userId = req.Personne.idPers
    console.log(donnes_user.getLibelleScore)
    models.Personne.findOne({
        attributes:['idPers','nom','prenom','mail'],
        where: {idPers : userId }
    }).then(function(user){
        if(user){
            res.status(201)
            res.render('profil',{isAdmin: req.Personne.isAdmin,user : user,donnes_user})
        }else{
            res.status(404)
            res.render('profil')
        }
    }).catch(function(err){
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    })    
}

const updateUserProfil = (req,res,next) => {
    let userId = req.Personne.idPers
    models.Personne.findOne({
        attributes:['idPers','nom','prenom','mail'],
        where: {idPers : userId }
    }).then(function(user){
        if (user)
        res.status(200)
        user.prenom=prenom
        user.nom=nom
        user.mail=mail
    })
}


module.exports = {getProfil}