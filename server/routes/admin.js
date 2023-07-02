const express = require("express");
const {
    acceptUserPin,
    declineUserPin,
} = require("../controllers/admin");
const { verifyToken } = require("../verifyToken");

const router = express.Router();

router.put("/accept/:pinId", verifyToken, acceptUserPin);

router.put("/decline/:pinId", verifyToken, declineUserPin);

module.exports = router;

