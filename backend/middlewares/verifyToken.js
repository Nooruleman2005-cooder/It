const jwt = require('jsonwebtoken');

const verifyToken = (req , res , next) =>{
    // header get token
    const authHeader = req.headers.authorization;

    // hedaer not recieve token
    if (!authHeader){
        return res.status(401).json({message : "Token not provided..."});
    }

    // bearer token sa token nikalna
    const token = authHeader.split(' ')[1];

    try{
        // verify token
        const checkedToken = jwt.verify(token , process.env.JWT_SECRET);

        // user info attach krna 
        req.user = checkedToken;

        // user checked process done and goto next
        next();
    }
    catch(error){
        return res.status(401).json({message : "Invalid TOken"})
    }
}

module.exports = {verifyToken};