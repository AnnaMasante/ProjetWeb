let MonCookie = require('../models/cookie');
let jwt = require('../models/cookie');


export function decodeToken(req,res){
    if (req.cookies['secureToken'] !==undefined){
        var decodeToken = jwt.verify(MonCookie.getToken(req),MonCookie.key())
    }
}