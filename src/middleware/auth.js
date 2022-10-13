const jwt = require("jsonwebtoken");
const SignupUser = require("../models/singup");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, "mynameisrohitandiamaprogrammer");
    console.log("verify", verifyUser);
  } catch (error) {
    res.status(401).send(error);
  }
  next();
};
module.exports = auth;
