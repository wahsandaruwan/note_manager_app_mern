const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv/config")

// Login user
exports.userLogin = async (req, res) => {
    const { username, password } = req.body

    // Check if username exist
    const userByUsername = await User.findOne({ username })
    if (!userByUsername) {
        return res.json({ errors: { message: "Wrong username!" } })
    }

    // Check if password matches
    const passMatch = await bcrypt.compare(password, userByUsername.password)
    if (!passMatch) {
        return res.json({ errors: { message: "Wrong password!" } })
    }

    // Generate jwt
    const accessToken = jwt.sign(
        {
            id: userByUsername._id,
            email: userByUsername.email
        },
        process.env.ACCESS_SECRET_KEY,
        {
            expiresIn: "1h"
        }
    )

    return res.status(200).json({ auth: true, token: accessToken, userId: userByUsername._id })
}