const express = require("express")
const router = express.Router()
const { userLogin, userRegister, renewAccessToken } = require("../controllers/userControllers")

// login user
router.post("/login", userLogin)

// Register user
router.post("/register", userRegister)

// Renew access token
router.post("/renewAccessToken", renewAccessToken)

module.exports = router