const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return ;

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return ;
    req.user = user;
    next()
  });
};