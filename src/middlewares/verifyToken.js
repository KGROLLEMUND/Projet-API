const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ 
            auth: false,
            token: null,
            message: "pas de token" });
    }
    jwt.verify(token, process.env.JWT_SECRET,function (err, jwtDecoded)  {
        if (err) {
            return res.status(401).send({ 
                auth: false,
                token: null,
                message: "non autorisé" });
        }
        console.log(jwtDecoded);
        req.userToken = jwtDecoded;
        next();
    });
}

module.exports = verifyToken;