const express = require("express");
const router = new express.Router();
const SignupUser = require("../models/singup");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/home", auth, (req, res) => {
  res.send("youre authenticated");
});
router.post("/signup", async (req, res) => {
  try {
    const data = new SignupUser(req.body);
    console.log(req.body);

    const token = await data.getJWTToken();
    console.log("token", token);
    res.cookie("mymovies", token);
    res.cookie("mymovies", token, {
      expires: new Date(Date.now() + 30000),
      htttpOnly: true,
    });
    const insertSignUp = await data.save();

    res.status(201).send("Signup Sucessfull");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const inputData = {
      username: req.body.username,
    };

    const data = await SignupUser.findOne(inputData);

    const isMatch = await bcrypt.compare(req.body.password, data.password);
    console.log("match password", isMatch);

    if (data === null || isMatch === false) {
      res.status(404).send("User or Password is not matching");
    } else {
      const token = await data.getJWTToken();

      res.cookie("mymovies", token, {
        expires: new Date(Date.now() + 30000),
        htttpOnly: true,
      });
      console.log(data.data);
      res.status(201).send("sassa");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
