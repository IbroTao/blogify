const { decode } = require("jsonwebtoken");

const authorizeUser = async(req, res, next) => {
    try{
        const authorizationHeader = req.headers["authorization"];
        if(!authorizationHeader) return res.status(401).json({msg: "Please add authorization header"});

        const decodedJWT = decode(authorizationHeader);
        const userid = decodedJWT.sub;


        req.userid = userid;
        next();
    } catch(e) {
        next(e);
    }
}

module.exports = {authorizeUser};