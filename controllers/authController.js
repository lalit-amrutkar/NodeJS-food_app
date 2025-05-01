const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { blackListtoken } = require("../utils/tokenBlacklist");

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

// Forgot Password API
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModels.findOne({ email });
        if (!user) return res.status(401).send({ success: false, message: "User Not Found" });

        // Creating a temporary randown token for short duration
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();
        console.log(user)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "l****k@gmail.com",
                pass: "*********"
            }
        });

        //Reset Link
        const resetLink = `http://localhost:8080/resetPassword/${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Reset Password Link",
            html: `<p>Reset Password</p><br/><button type="button" style="background-color:'red'; color:"white"><a href="${resetLink}">Reset Link</a></button>`
        })

        res.status(200).send({
            success: true,
            message: "Reset Password link sent successfully!"
        })



    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Something went wrong!",
            error
        })
    }
}

// Reset Password
const resetPasswordController = async (req, res) => {
    try {
        const token = req.params.token;
        const password = req.body.password;
        const user = await userModels.findOne({
            resetToken: token,
        });
        console.log("Test", user)
        if (!user) return res.status(400).send({ success: false, message: "Invalid or token expired" });

        //Incrypt token using hash
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        res.status(200).send({
            success: true,
            messge: "Password Updated Successfully!"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Something went wrong!",
            error
        })
    }
}

const logOutController = (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        blackListtoken(token)
        return res.status(200).send({ success: true, message: "Logout successfully!" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Something went wrong!", error })
    }
}

module.exports = { registerController, loginController, forgotPasswordController, resetPasswordController, logOutController }