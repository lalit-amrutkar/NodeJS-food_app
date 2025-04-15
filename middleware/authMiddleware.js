const JWT = require("jsonwebtoken");
const { isTokenBlackList } = require("../utils/tokenBlacklist");

// Auth Middleware

module.exports = async (req, res, next) => {
    try {
        // get token
        const token = req.headers["authorization"].split(" ")[1];
        const isTokenBlackListed = isTokenBlackList(token);
        if (!token) {
            return res.status(401).send({ success: false, message: "Token missing" });
        }

        const isBlacklisted = isTokenBlackList(token);

        if (isBlacklisted) {
            return res.status(400).send({ success: false, message: "Token expired or invalid" });
        }

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
