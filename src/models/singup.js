const express = require("express");
var jwt = require("jsonwebtoken");
const { default: mongoose, models } = require("mongoose");
const bcrypt = require("bcrypt");

const signUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});
//create Token
signUpSchema.methods.getJWTToken = async function () {
  try {
    const token = await jwt.sign(
      {
        username: this.username,
      },
      "mynameisrohitandiamaprogrammer"
    );
    console.log("token", token);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.log("token error", err);
  }
};

//middlware hasing password
signUpSchema.pre("save", async function (next) {
  console.log(this.password);
  if (this.isModified("password")) {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
    next();
  }
});

//created new collections

const SignupUser = new mongoose.model("SignupUser", signUpSchema);

module.exports = SignupUser;
