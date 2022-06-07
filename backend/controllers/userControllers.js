const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv/config")

// Login user
exports.userLogin = async (req, res) => {
    const { userName, password } = req.body

    // Check if username exist
    const userByUsername = await User.findOne({ userName })
    if (!userByUsername) {
        return res.json({ errors: { message: "Wrong username!" } })
    }

    // Check if password matches
    const passMatch = await bcrypt.compare(password, userByUsername.password)
    if (!passMatch) {
        return res.json({ errors: { message: "Wrong password!" } })
    }

    // Generate access token
    const accessToken = jwt.sign(
        {
            id: userByUsername._id,
            email: userByUsername.email
        },
        process.env.ACCESS_SECRET_KEY,
        {
            expiresIn: "20s"
        }
    )

    // Generate refresh token
    const refreshToken = jwt.sign(
        {
            id: userByUsername._id,
            email: userByUsername.email
        },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn: "7d"
        }
    )

    return res.status(200).json({ auth: true, accessToken: accessToken, refreshToken: refreshToken, userId: userByUsername._id })
}

// Register user
exports.userRegister = async (req, res) => {
    const { fullName, email, userName, password } = req.body

    // Check if username or email already exist
    const userByUserNameOrEmail = await User.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    })
    if (userByUserNameOrEmail) {
        return res.json({ errors: { message: "Username or email already exist!" } })
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 8)
    const newPass = password.length >= 8 ? hashedPassword : false

    const newUser = new User({
        fullName,
        email,
        userName,
        password: newPass
    })

    try {
        // Save user
        await newUser.save()
        return res.status(201).json({ created: true, success: { message: "Successfully registered a new user!" } })
    } catch (err) {
        return res.json({ errors: { message: Object.entries(err.errors)[0][1].message } })
    }
}

// Renew access token
exports.renewAccessToken = (req, res) => {
    const { refreshToken } = req.body

    // Check if refresh token is empty
    if (!refreshToken) {
        return res.json({ errors: { message: "User is not authenticated!" } })
    }

    // Verify refresh token
    const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)

    // Generate new access token
    if (user) {
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.ACCESS_SECRET_KEY,
            {
                expiresIn: "20s"
            }
        )

        return res.status(200).json({ auth: true, accessToken: accessToken, refreshToken: refreshToken, userId: user.id })
    }
}