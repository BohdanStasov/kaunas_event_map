const express = require("express");
const User = require("../models/User");
const {
  like,
  dislike,
  addUserPin,
} = require("../controllers/user");
const { verifyToken } = require("../verifyToken");
const UserPin = require("../models/UserPin");

const router = express.Router();

router.put("/like/:pinId", verifyToken, like);

router.put("/dislike/:pinId", verifyToken, dislike);

router.post("/createPin", verifyToken, addUserPin);

router.get("/userpins", async (req, res) => {
  try {
    const userpins = await UserPin.find();
    res.status(200).json(userpins);
  } catch (err) {
res.status(500).json(err);  
  }
});

router.post("/adduserpin", async (req, res) => {
  const newPin = new UserPin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, username: 1, }); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, username: 1, }); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;