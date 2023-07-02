const Pin = require("../models/Pin");
const UserPin = require("../models/UserPin");

module.exports.like = async (req, res, next) => {
  const username = req.user.username;
  const pinId = req.params.pinId;
  try {
    await Pin.findByIdAndUpdate(pinId,{
      $addToSet:{likes:username},
    })
    await UserPin.findByIdAndUpdate(pinId,{
      $addToSet:{likes:username},
    })
    res.status(200).json("Pin has been liked.")
  } catch (err) {
    next(err);
  }
};

module.exports.dislike = async (req, res, next) => {
  const username = req.user.username;
  const pinId = req.params.pinId;
  try {
    await Pin.findByIdAndUpdate(pinId,{
      $pull:{likes:username}
    })
    await UserPin.findByIdAndUpdate(pinId,{
      $pull:{likes:username}
    })
    res.status(200).json("disliked.")
} catch (err) {
  next(err);
}
};

module.exports.addUserPin = async (req, res, next) => {
  try {
    const newUserPin = new UserPin({ ...req.body});
    await newUserPin.save();
    res.status(200).send("Pin has been created!");
  } catch (err) {
      console.log(err)
  }
};

