const reString = new RegExp("^[A-Za-z]+$");
/*const reMail = new RegExp("")*/
const reTel = new RegExp("^([0-9]{2}){5}$");

function checkPrenomNom(a){
    return reString.test(a);
}

///function checkMail(a) {
//    return reMail.test(a);
//}

function checkTel(a) {
    return reTel.test(a);
}

function checkAll(a,b,d){
    return checkPrenomNom(a)&&checkPrenomNom(b)&&checkTel(d);
}

module.exports = { checkPrenomNom, checkTel, checkAll};

