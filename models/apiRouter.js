//Imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');

//Router
exports.router=(function() {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);//On appelle la fonction register dans users
    apiRouter.route('users/login/').post(usersCtrl.login);

    return apiRouter;
})();