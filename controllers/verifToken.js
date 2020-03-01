const jwt = require("jsonwebtoken");
const cle = "EjX2VDdx7TjpM6BEMDmAg33L46t0ADgu"

const verifToken = (req, res, next) => {
    const token = req.headers.cookie;
    console.log(token)
    if(token){
        jwt.verify(token.split("=")[1],cle, (err,Personne) => {
            if(err) {console.log(err) 
                    return res.render("success")}
            req.Personne = Personne;
            next();
        });
    }else{
        return res.render('login')
    }
};

module.exports = verifToken;