const path = require('path')
const check = require('../controllers/verifRegister')
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'bdd.sqlite'
})
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
      }
  });

  Personne.sync()
  .then(() => console.log('Table de Personne créée'))
  .catch(err => console.log('Oups ça ne marche pas'));

//Fonctions d'aide
const createUser = async ({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe}) => {
  return await Personne.create({idPers, prenom, nom, numTel, enRecherche, mail, mdp, sexe});
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
              let payload = {idPers: user.idPers};
              
              let token = jwt.sign(payload, jwtOptions.secretOrKey);
              console.log(token);
              res.cookie('secureToken',token,{httpOnly:true} );
              /*app.get('login/profil',function(req,res){
                  return res.sendFile(path.join(__dirname + '/views/profil.html'));
              })*/
              var link = res.redirect('/profil')
              return link
              
          } else {
              var link = res.status(401).json({msg: "Mot de passe incorrect"});
              return link;
          }
      }
  },

  register: function(req,res,next){
    const {prenom, nom, numTel, enRecherche, mail, mdp, sexe} = req.body;
    const mdp1 = req.body.mdp1;
    if (mdp === mdp1) {
        if (check.checkAll(prenom, nom, numTel)) {
            createUser({prenom, nom, numTel, enRecherche, mail, mdp, sexe}).then(Personne =>
                res.render('success')
            )
        } else {
            res.json({Personne, msg: "Elements incorrects"})
        }
    } else {
        res.json({Personne, msg: "Mots de passe invalides"});
    } 
  }
}
