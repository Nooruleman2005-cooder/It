const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if(!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role !== "admin"){
      return res.status(403).json({ message: "Admin access only" });
    }
    req.user = decoded; // decoded info save for next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;