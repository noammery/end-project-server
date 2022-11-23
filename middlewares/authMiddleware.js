const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "משתמש לא מורשה" });
    }
    jwt.verify(token, process.env.SECRET);
    
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "משתמש לא מורשה" });
  }
};
