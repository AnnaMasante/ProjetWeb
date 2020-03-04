const path = require('path')
const check = require('../controllers/verifRegister')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken');
const jwtutils = require('../utils/jwt.utils');
const express = require('express');
const app = express();
const cle = "EjX2VDdx7TjpM6BEMDmAg33L46t0ADgu";
const Personne = require('./db/models/personne')
//const Personne = require('./tables/personne')
/*const jwt_decode = require('jwt-decode');
const passport = require('passport');*/
const passportJWT = require('passport-jwt');
/*let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'bdd.sqlite'
});*/

let jwtOptions = {};

//const Personne = require('./personne')(sequelize, Sequelize.DataTypes);
//const Question = require('./question')(sequelize, Sequelize.DataTypes);
//const Reponse = require('./reponse')(sequelize, Sequelize.DataTypes);


//Fonctions d'aide
const createUser = async ({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe, isAdmin}) => {
  return await Personne.create({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe, isAdmin});
};

const getAllUsers = async () => {
  return await Personne.findAll();
};

const getUser = async obj => {
  return await Personne.findOne({
      where: obj,
  });
};




module.exports = {
  login: async function(req,res){

    const mail = req.body.mail;
    const mdp = req.body.mdp;
    if (mail && mdp) {
        let user = await getUser({mail});
        if (!user) {
            res.status(401).json({msg: "Utilisateur non trouvé", user});
        }
        if (mdp!=null && user.mdp === mdp ) {            
            console.log('IMPRESSION DE L ID')
            console.log(user.idPers)
            let payload = {idPers: user.idPers, prenom : user.prenom, nom : user.nom, isAdmin : user.isAdmin};              
            let token = jwt.sign(payload,cle);
            res.cookie('toto',token,{expiresIn:'1h',httpOnly: true})
        
            var link = res.redirect('/profil')
            return link
        
       } else {
            var link = res.status(401).json({msg: "Mot de passe incorrect"});
            return link;
        }
    }
  },

  register: function(req,res,next){
    const {prenom, nom, numTel, enRecherche, mail, mdp, sexe,isAdmin} = req.body;
    const mdp1 = req.body.mdp1;
    if (mdp === mdp1) {
        if (check.checkAll(prenom, nom, numTel)) {
            createUser({prenom, nom, numTel, enRecherche, mail, mdp, sexe, isAdmin}).then(Personne =>  
              res.render('success')
            )
        } else {
            res.json({Personne, msg: "Elements incorrects"})
        }
    } else {
        res.json({Personne, msg: "Mot de passe invalide"});
    } 
    
  },

    logout: function(req,res){
        res.clearCookie("jwt")
        res.redirect('/users/login')
    },

};
