import { useState } from "react"

import Footer from "../Sections/Footer"
import NavBar from "../Sections/NavBar"
import Note from "../Sections/Note"

import { ThemeContext } from "../../Contexts/ThemeContext"
import NotePopup from "../Sections/NotePopup"

const Feed = () => {
    // Theme state
    const [theme, setTheme] = useState("light")

    // Popup state
    const [showPopup, setShowPopup] = useState(false)

    // Toggle theme
    const toggleTheme = () => {
        // Default theme is light
        setTheme((curr) => curr === "light" ? "dark" : "light")
    }

    // Toggle popup
    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    return (
        <>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <div className="feed" id={theme}>
                    <NavBar openPopupFunc={togglePopup} />
                    <div className="note-area">
                        <Note />
                        <Note />
                        <Note />
                        <Note />
                        <Note />
                    </div>
                    <Footer />
                    {
                        showPopup && <NotePopup closePopupFunc={togglePopup} />
                    }
                </div>
            </ThemeContext.Provider>
        </>
    )
}

export default Feed