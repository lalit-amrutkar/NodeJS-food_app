const JWT = require("jsonwebtoken");

// Auth Middleware

module.exports = async (req, res, next) => {
    try {
        // get token
        const token = req.headers["authorization"].split(" ")[1];
        console.log(token)
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    message: "Auth token is invlid"
                })
            } else {
                req.user = { _id: decode.id }; // better than writing into body
                next();
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Please provide auth token!"
        })
    }
}
