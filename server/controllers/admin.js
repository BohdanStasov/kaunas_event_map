const UserPin = require("../models/UserPin");
const Pin = require("../models/Pin");

module.exports.acceptUserPin = async (req, res) => {
    const pinId = req.params.pinId;
    try {
        await UserPin.findByIdAndUpdate(pinId,{
            $set: { 
              accepted: true,
              declined: false,
              status: "Accepted",
            },      
        });
        res.status(200).json("Pin has been accepted.")
    } catch (error) {
        console.log(error) 
    }
  }

module.exports.declineUserPin = async (req, res) => {
  const pinId = req.params.pinId;
  try {
    await UserPin.findByIdAndUpdate(pinId,{
        $set: { 
          accepted: false,
          declined: true,
          status: "Declined",
        },      
    });
    await Pin.findByIdAndDelete(pinId)
    res.status(200).json("Pin has been declined.")
  } catch (error) {
    console.log(error) 
  }
}