const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User created");
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ error: "Incorect credentials" })

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return res.status(404).json({ error: "Incorect credentials" })

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT, {
      expiresIn: "30d",
    });
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};


