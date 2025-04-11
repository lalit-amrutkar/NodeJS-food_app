const userModels = require("../models/userModels");

const getUserDetails = async (req, res) => {
    try {
        // Find the user in DB
        const user = await userModels.findById({ _id: req.user._id });
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
            message: "User Details",
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



module.exports = { getUserDetails }