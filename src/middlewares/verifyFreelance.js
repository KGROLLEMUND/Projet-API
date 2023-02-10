function verifyFreelance(req, res, next) {
    console.log(req.userToken);
    if (!req.userToken.isFreelance) {
      res.status(401).send({ 
        auth: false,
        message: "Vous êtes pas un freelance" });
    } 
    next();
  }
  
  module.exports = verifyFreelance;
  