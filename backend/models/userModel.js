const mongoose = require("mongoose")
const { validateName, validateEmail, validateUserName } = require("../helpers/customValidation")

// Create user schema
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Enter full name."],
            minLength: [5, "Minimum length of the full name would be 5 characters."],
            maxLength: [50, "Maximum length of the full name would be 50 characters."],
            validate: [validateName, "Enter name only using letters & spaces."]
        },
        email: {
            type: String,
            required: [true, "Enter email."],
            minLength: [10, "Minimum length of the email would be 10 characters."],
            maxLength: [150, "Maximum length of the email would be 150 characters."],
            validate: [validateEmail, "Enter a valid email."]
        },
        userName: {
            type: String,
            required: [true, "Enter username."],
            minLength: [5, "Minimum length of the username would be 5 characters."],
            maxLength: [20, "Maximum length of the username would be 20 characters."],
            validate: [validateUserName, "Enter username only using letters & numbers."]
        },
        password: {
            type: String,
            required: [true, "Enter password."],
            minLength: [8, "Minimum length of the username would be 8 characters."],
            maxLength: [150, "Maximum length of the username would be 150 characters."]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)