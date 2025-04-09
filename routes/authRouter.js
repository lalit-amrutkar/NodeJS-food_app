const express = require("express");
const { registerController, loginController } = require("../controllers/authController");



//Router Object
const router = express.Router();


//Post method with path and controller
router.post('/register', registerController);
router.post('/login', loginController)

module.exports = router