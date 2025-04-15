const express = require("express");
const { registerController, loginController, forgotPasswordController, resetPasswordController, logOutController } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");



//Router Object
const router = express.Router();


//Post method with path and controller
router.post('/register', registerController);
router.post('/login', loginController);
//Forgot Password
router.post('/forgotPassword', forgotPasswordController);
//Reset Password
router.post('/resetPassword/:token', resetPasswordController);
//Logout Controller
router.post('/logout', authMiddleware, logOutController)

module.exports = router