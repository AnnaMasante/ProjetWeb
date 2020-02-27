const Sequelize = require('sequelize');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const app = express();
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

module.exports =
{ startTheApp: function(){
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'wowwow';

    //Strategy web token
    let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        console.log('payload received ', jwt_payload);
        let user = getUser({id: jwt_payload.id});
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

    //use the strategy
    passport.use(strategy);
    app.use(passport.initialize());

}


}