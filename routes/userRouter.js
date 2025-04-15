const express = require("express");
const { getUserDetailsController, updateUserDetailsController, getAllUserController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Router object
const router = express.Router();
// Get All user info
router.get('/getAllUser', authMiddleware, getAllUserController)

//Endpoint for get user details for specific user
router.get('/getUser', authMiddleware, getUserDetailsController);

//Update User Detail
router.put('/updateUser', authMiddleware, updateUserDetailsController);

//Delete User
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);




module.exports = router