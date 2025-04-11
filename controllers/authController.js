const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")

const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body; // Destructuring a request body

        //Validation
        if (!username || !email || !password || !address || !phone) {
            return res.status(500).send({
                success: false,
                message: "Please provide all field",
            })
        }
        const existing = await userModels.findOne({ email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email Already registered, please login",
            })
        }

        // Hashing and encrypt a password credential
        var salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);


        // create a new user
        const user = await userModels.create({ username, email, password: hashedPassword, address, phone })
        return res.status(201).send({
            success: true,
            message: "Successfully Registered, Please login with your credential!",
            user
        });
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}
const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(500).send({
                status: false,
                message: "Email and Password Required"
            });
        }

        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found, please sign up!!!"
            });
        }
        // check and compare password is correct or not
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        // create token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        user.password = undefined; // Remove password in the user response
        return res.status(200).send({
            status: true,
            message: "Login Successfully",
            token: token,
            user
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: " Something Went Wrong"
        })
    }

}
module.exports = { registerController, loginController }