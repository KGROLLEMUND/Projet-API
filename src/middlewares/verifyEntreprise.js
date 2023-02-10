function verifyEntreprise(req, res, next) {
    console.log(req.userToken);
    if (!req.userToken.isEntreprise) {
      res.status(401).send({ 
        auth: false,
        message: "vous êtes pas une entreprise" });
    } 
    next();
  }
  
  module.exports = verifyEntreprise;
  