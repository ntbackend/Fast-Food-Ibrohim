const { verify } = require("jsonwebtoken");
const config = require("../../config");

const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Token yo'q" });

  verify(token, config.jwtSecretKey, (err, data) => {
    if (err) return res.status(401).json({ message: "Token xato" });

    req.user = data;
    next();
  });
};

module.exports = isAuth;
