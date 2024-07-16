const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const config = require("../../config");

const loginPage = (req, res) => {
  res.render("auth/login");
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await Admin.findOne({ username });

    if (!findUser) return res.status(403).json({ message: "Invalid username" });

    const checkPass = await compare(password, findUser.password);

    if (!checkPass)
      return res.status(403).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: findUser.id, isAdmin: findUser.isAdmin },
      config.jwtSecretKey,
      { expiresIn: "3h" }
    );

    res.cookie('token', token, { httpOnly: true });

    res.redirect("/api/products/list");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  loginPage,
};
