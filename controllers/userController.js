const userModels = require("../models/userModels");
const crypto = require("crypto");
const nodemailer = require("nodemailer")


// Get All User

const getAllUserController = async (req, res) => {
    try {
        const allUser = await userModels.find();
        const withOutPassword = allUser.map((user) => {
            const { password, ...withOutPassword } = user._doc; // Desctructuring array (user._doc - Gives you the raw object from the mongoose document)
            return withOutPassword
        })
        res.status(200).send({
            success: true,
            message: "All User Info",
            data: withOutPassword
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: "Something went wrong in Get All User Info"
        })
    }

}

// Get User detail by user ID
const getUserDetailsController = async (req, res) => {
    try {
        // Find the user in DB
        const user = await userModels.findById({ _id: req.user._id }, { _id: 0 });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Details Not Found!"
            });
        }
        // Hide Password 
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User Details!",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong!!"
        })
    }
}

// Update user details
const updateUserDetailsController = async (req, res) => {
    try {
        const allowedUpdates = ["username", "address", "phone"];
        const updates = Object.keys(req.body);
        const isValid = updates.every((key) => allowedUpdates.includes(key));

        if (!isValid) {
            return res.status(400).send({
                success: false,
                message: "Invalid fields in update",
            });
        }

        const updatedUser = await userModels.findByIdAndUpdate(
            req.user._id,
            req.body,
            { new: true, runValidators: true }
        );
        updatedUser.save();
        res.status(200).send({
            success: true,
            message: "Profile updated",
            updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
            error
        });
    }
}

const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id;
        await userModels.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "User deleted successfully!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Something went wrong!!", error })
    }

}




module.exports = { getAllUserController, getUserDetailsController, updateUserDetailsController, deleteUserController }