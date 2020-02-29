let MonCookie = require('../models/cookie');
let jwt = require('../models/cookie');


class Token {
    static decodeToken(req, token){
        var decoded = jwt_decode(token);
        return decoded;
    }

    static setToken(res, token){
        return res.cookie('secureToken',token,{httpOnly:true} );
    }

    static getToken(res,token){
        return req.cookies['secureToken'];
    }
        
    static destroyToken(req,res){
        res.clearCookie('secureToken');
    }
    
}
module.exports = Token;

