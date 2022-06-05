import { useState } from "react"

import Login from "../Sections/Login"
import Register from "../Sections/Register"

const Home = () => {
    // Form state
    const [toggleLgReg, setToggleLgReg] = useState(true)

    return (
        <>
            <div className="home">
                {
                    toggleLgReg ? <Login formToggleFunc={setToggleLgReg} /> : <Register formToggleFunc={setToggleLgReg} />
                }
            </div>
        </>
    )
}

export default Home