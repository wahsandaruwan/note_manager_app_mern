import { useContext } from "react"

import { MdHome, MdAddToPhotos, MdViewStream, MdDarkMode, MdWbSunny, MdMotionPhotosOff } from "react-icons/md"

import InputBox from "../Elements/InputBox"
import MainButton from "../Elements/MainButton"
import ToolTip from "../Elements/ToolTip"
import "./Styles/NavBarStyles.css"

import { ThemeContext } from "../../Contexts/ThemeContext"

const NavBar = ({ openPopupFunc }) => {
    // Get context values
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <>
            <div className="navbar-section">
                <div className="search">
                    <InputBox inputType="text" inputPlaceholder="Search Notes..." />
                </div>
                <div className="menu">
                    <ToolTip toolTipText="All Notes"><MainButton buttonText={<MdHome />} /></ToolTip>
                    <ToolTip toolTipText="Add Notes"><MainButton buttonText={<MdAddToPhotos />} clickFunc={openPopupFunc} /></ToolTip>
                    <ToolTip toolTipText="My Notes"><MainButton buttonText={<MdViewStream />} /></ToolTip>
                    <ToolTip toolTipText={theme === "dark" ? "Toggle light mode" : "Toggle dark mode"}><MainButton buttonText={theme === "light" ? <MdDarkMode /> : <MdWbSunny />} clickFunc={toggleTheme} /></ToolTip>
                    <ToolTip toolTipText="Logout"><MainButton buttonText={<MdMotionPhotosOff />} /></ToolTip>
                </div>
            </div>
        </>
    )
}

export default NavBar