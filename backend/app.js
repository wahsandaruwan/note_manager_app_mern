const express = require("express")
const app = express()
const PORT = 3300
require("./helpers/dbCon")
const { authUser } = require("./middleware/authentication")
const noteRoutes = require("./routes/noteRoutes")
const userRoutes = require("./routes/userRoutes")

// Common middleware
app.use(express.json())

// Basic route
app.get("/", (req, res) => {
    res.send(`Welcome to the server!`)
})

// Base route for notes
app.use("/api/notes", authUser, noteRoutes)

// Base route for user
app.use("/api/users", userRoutes)

// Route for wrong urls
app.use((req, res) => {
    res.status(404).json({ error: { message: "Not found!" } })
})

// Bind and listen the connection
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})