function verifyAdmin(req, res, next) {
    console.log(req.userToken);
    if (!req.userToken.isAdmin) {
      res.status(401).send({ 
        auth: false,
        message: "non autorisé" });
    } 
    next();
  }
  
  module.exports = verifyAdmin;
  