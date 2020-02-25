//Imports

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Routes
module.exports = {
    register:function (req,res) {
    var mail = req.body.mail;
    var mdp = request.body.mdp;

    if(mail == null || mdp == null){
        return res.status(400).json({'error':'missing parameters'});
    }
    //Vérification que le mail est correct
    if(!checkEmail(mail)){
        return res.status(501).json({'error':'mail invalide'});
    }

        asyncLib.waterfall([//On arrête si je trouve une erreur
            function(done) {
                models.Personne.findOne({
                    where: { mail: mail }
                })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.compare(mdp, userFound.mdp, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'user not exist in DB' });
                }
            },
            function(userFound, resBycrypt, done) {
                if(resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'invalid password' });
                }
            }
        ], function(userFound) { //Il n'y a pas eu d'erreurs
            if (userFound) {
                return res.status(201).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            } else {
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
                var userId      = jwtUtils.getUserId(headerAuth);

                if (userId < 0)
                    return res.status(400).json({ 'error': 'wrong token' });

                models.User.findOne({
                    attributes: [ 'id', 'mail', 'mail'],
                    where: { id: userId }
                }).then(function(user) {
                    if (user) {
                        res.status(201).json(user);
                    } else {
                        res.status(404).json({ 'error': 'user not found' });
                    }
                }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot fetch user' });
                });
            },
            updateUserProfile: function(req, res) {
            // Getting auth header
            var headerAuth  = req.headers['authorization'];
            var userId      = jwtUtils.getUserId(headerAuth);

            // Params

        });
    },
    getUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];var bio = req.body.bio;

        asyncLib.waterfall([
            function(done) {
                models.Personne.findOne({
                    attributes: ['id', 'bio'],
                    where: { id: userId }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if(userFound) {
                    userFound.update({
                        bio: (bio ? bio : userFound.bio)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot update user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });
    }
}
function checkEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
