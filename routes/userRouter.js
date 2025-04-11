const express = require("express");
const { getUserDetails } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Router object
const router = express.Router();

//Endpoint
router.get('/getUser', authMiddleware, getUserDetails);

module.exports = router