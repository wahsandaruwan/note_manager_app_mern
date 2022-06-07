const jwt = require("jsonwebtoken")
require("dotenv/config")

// Token validation
exports.authUser = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const accessToken = authHeader.split("Bearer ")[1]
        if (accessToken) {
            try {
                // Verify access token
                const user = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)
                req.user = user
                return next()
            } catch (err) {
                return res.json({ authEx: true, errors: { message: "Your login session has expired!" } })
            }
        }
        return res.json({ errors: { message: "Access token must be properly provided!" } })
    }
    return res.json({ errors: { message: "Authorization header must be provided!" } })
}