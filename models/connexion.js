const path = require('path')
const check = require('../controllers/verifRegister')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken');
const jwtutils = require('../utils/jwt.utils');
const express = require('express');
const app = express();
const cle = "EjX2VDdx7TjpM6BEMDmAg33L46t0ADgu"

//const Personne = require('./tables/personne')
const jwt_decode = require('jwt-decode')
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'bdd.sqlite'
})

let jwtOptions = {};

//Create user model
const Personne = sequelize.define(
  'Personne', {
      idPers: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      prenom: {
          type: Sequelize.STRING
      },
      nom: {
          type: Sequelize.STRING
      },
      numTel: {
          type: Sequelize.INTEGER
      },
      enRecherche: {
          type: Sequelize.TINYINT,
          defaultValue: 0
      },
      mail: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true,
              notEmpty: true,
          }
      },
      mdp: {
          type: Sequelize.STRING
      },
      sexe: {
          type: Sequelize.STRING
      },
      isAdmin:{
          type: Sequelize.TINYINT,
          defaultValue:0
      }
  });

  Personne.sync()
  .then(() => console.log('Table de Personne créée'))
  .catch(err => console.log('Oups ça ne marche pas'));

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
    //jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    //jwtOptions.secretOrKey = 'wowwow';

    //Strategy web token
    /*let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        console.log('payload received ', jwt_payload);
        //console.log(jwt_payload.id);
        let user = getUser({id: jwt_payload.id});
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });*/

    //use the strategy
   // passport.use(strategy);
    //app.use(passport.initialize());


    const mail = req.body.mail;
    const mdp = req.body.mdp;
    if (mail && mdp) {
        let user = await getUser({mail});
        if (!user) {
            res.status(401).json({msg: "Utilisateur non trouvé", user});
        }
        if (mdp!=null && user.mdp === mdp ) {            
            let payload = {idPers: user.idPers, prenom : user.prenom, nom : user.nom, isAdmin : user.isAdmin};              
            //let token = jwt.sign(payload,jwtOptions.secretOrKey);
            let token = jwt.sign(payload,cle);
            res.cookie('toto',token,{expiresIn:'1h',httpOnly: true})
            //console.log(req.headers.cookie)
            //console.log(token);
          
        
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
    }
}
