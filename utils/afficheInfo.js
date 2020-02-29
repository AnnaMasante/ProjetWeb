//Décoder un token 

var cookieExtractor = function(req){
    var token = null;
    if (req && req.cookies){
        token = req.cookies['jwt'];
    }
    return token;
}