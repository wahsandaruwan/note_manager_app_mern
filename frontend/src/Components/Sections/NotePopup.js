import React from 'react'
import InputBox from '../Elements/InputBox'
import MainButton from '../Elements/MainButton'
import "./Styles/NotePopupStyles.css"

const NotePopup = ({ closePopupFunc }) => {
    return (
        <>
            <div className="popup-background">
                <div className="note-popup">
                    <h1 className="heading">Add New Note</h1>
                    <InputBox inputType="text" inputPlaceholder="Enter note title..." />
                    <textarea placeholder="Enter note details..."></textarea>
                    <MainButton buttonText="Add Note" />
                    <MainButton buttonText="Close" clickFunc={closePopupFunc} />
                </div>
            </div>
        </>
    )
}

export default NotePopup