const isAdmin = (req, res, next) => {
    if(req.Personne.isAdmin==1){
        next();
    }else{
        res.status(403).render('profil')
    }
};

module.exports = isAdmin;