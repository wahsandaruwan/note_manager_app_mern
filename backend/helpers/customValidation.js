// Validate title
exports.validateTitle = (title) => {
    const regEx = /^[a-zA-Z0-9\s]+$/
    return regEx.test(title)
}

// Validate full name
exports.validateName = (name) => {
    const regEx = /^[a-zA-Z\s]+$/
    return regEx.test(name)
}

// Validate username
exports.validateUserName = (username) => {
    const regEx = /^[a-zA-Z0-9]+$/
    return regEx.test(username)
}

// Validate email
exports.validateEmail = (email) => {
    const regEx = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9\.]{2,}$/
    return regEx.test(email)
}