import { RiEditLine, RiDeleteBin2Line } from "react-icons/ri"
import MainButton from "../Elements/MainButton"

import "./Styles/NoteStyles.css"

const Note = () => {
    return (
        <>
            <div className="note-section">
                <h1 className="title">
                    This is sample note.
                </h1>
                <p className="details">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eveniet deserunt, vero quos beatae rerum, mollitia totam magnam quae maxime corporis. Soluta non aspernatur rerum.
                </p>
                <div className="note-buttons">
                    <MainButton buttonText={<RiEditLine />} />
                    <MainButton buttonText={<RiDeleteBin2Line />} />
                </div>
            </div>
        </>
    )
}

export default Note