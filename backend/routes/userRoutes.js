const express = require("express")
const router = express.Router()
const { userLogin, userRegister } = require("../controllers/userControllers")

// login user
router.post("/login", userLogin)

// Register user
router.post("/register", userRegister)

module.exports = router