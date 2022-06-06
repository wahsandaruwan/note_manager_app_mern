const Note = require("../models/noteModel")

// Get all notes of the user
exports.getAllNotesUser = async (req, res) => {

    try {
        // Find all notes of the user
        const notes = await Note.find()
        return res.status(200).json(notes)
    } catch (err) {
        return res.json({ errors: { message: err.message } })
    }
}

// Add new note
exports.addNewNote = async (req, res) => {
    const { title, details } = req.body

    // Check if note title already exist
    const noteByTitle = await Note.findOne({ title })
    if (noteByTitle) {
        return res.json({ errors: { message: "Note title already exists!" } })
    }

    // Create a new note
    const newNote = new Note({
        title,
        details
    })

    try {
        // Save note
        await newNote.save()
        return res.status(201).json({ created: true, success: { message: "Note successfully created!" } })
    } catch (err) {
        return res.json({ errors: { message: Object.entries(err.errors)[0][1].message } })
    }
}

// Get note by id
exports.getNoteById = async (req, res) => {
    const { noteId } = req.params

    // Check the length of note id
    if (noteId.length !== 24) {
        return res.json({ errors: { message: "Provided note id doesn't compatible!" } })
    }

    try {
        // Find a note by id
        const note = await Note.findById(noteId)
        return res.status(200).json(note)
    } catch (err) {
        return res.json({ errors: { message: Object.entries(err.errors)[0][1].message } })
    }
}

// Update note by id
exports.updateNote = async (req, res) => {
    const { noteId } = req.params
    const { title, details } = req.body

    // Check the length of note id
    if (noteId.length !== 24) {
        return res.json({ errors: { message: "Provided note id doesn't compatible!" } })
    }

    // Check if note available according to the id
    const noteById = await Note.findById(noteId)
    if (!noteById) {
        return res.json({ errors: { message: "Note doesn't exists!" } })
    }

    // Check if note title already exist
    const noteByTitle = await Note.findOne({ title })
    if (noteByTitle) {
        if (noteByTitle.id !== noteId) {
            return res.json({ errors: { message: "Note title already exists!" } })
        }
    }

    try {
        // Find and update note
        await Note.findOneAndUpdate(
            { _id: noteId },
            {
                title,
                details
            },
            {
                new: true,
                runValidators: true
            }
        )
        return res.status(200).json({ created: true, success: { message: "Note successfully updated!" } })
    } catch (err) {
        return res.json({ errors: { message: Object.entries(err.errors)[0][1].message } })
    }
}

// Delete note by id
exports.deleteNoteById = async (req, res) => {
    const { noteId } = req.params

    // Check the length of note id
    if (noteId.length !== 24) {
        return res.json({ errors: { message: "Provided note id doesn't compatible!" } })
    }

    // Check if note available according to the id
    const noteById = await Note.findById(noteId)
    if (!noteById) {
        return res.json({ errors: { message: "Note doesn't exists!" } })
    }

    try {
        await Note.findByIdAndDelete(noteId)
        return res.status(200).json({ created: true, success: { message: "Note successfully deleted!" } })
    } catch (err) {
        return res.json({ errors: { message: Object.entries(err.errors)[0][1].message } })
    }
}

// Search notes
exports.getNotesBySearch = async (req, res) => {
    const { query } = req.params

    try {
        const regexQuery = new RegExp(query, "i")
        const notes = await Note.find({
            $or: [
                { title: regexQuery },
                { details: regexQuery }
            ]
        })
        return res.status(200).json(notes)
    } catch (err) {
        return res.json({ errors: { message: Object.entries(err.errors)[0][1].message } })
    }
}