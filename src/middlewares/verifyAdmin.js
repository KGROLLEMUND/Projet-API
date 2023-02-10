function verifyAdmin(req, res, next) {
    console.log(req.userToken);
    if (!req.userToken.isAdmin) {
      res.status(401).send({ 
        auth: false,
        message: "Vous êtes pas un admin" });
    } 
    next();
  }
  
  module.exports = verifyAdmin;
  