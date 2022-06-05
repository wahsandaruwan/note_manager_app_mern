import { useSpring, animated } from "react-spring"

import InputBox from "../Elements/InputBox"
import MainButton from "../Elements/MainButton"
import "./Styles/LoginRegisterStyles.css"

const Register = ({ formToggleFunc }) => {
    // Spring transition
    const springTrans = useSpring({
        from: {
            x: 2000,
            opacity: 0
        },
        to: {
            x: 0,
            opacity: 1
        },
        config: {
            duration: 500
        }
    })

    return (
        <>
            <animated.div style={springTrans} className="login-register-section">
                <div className="login-register-form">
                    <h1 className="heading">Register</h1>
                    <InputBox inputType="text" inputPlaceholder="Enter Your Name..." />
                    <InputBox inputType="text" inputPlaceholder="Enter Your Email..." />
                    <InputBox inputType="text" inputPlaceholder="Enter Your Username..." />
                    <InputBox inputType="password" inputPlaceholder="Enter Your Password..." />
                    <InputBox inputType="password" inputPlaceholder="Re-Enter Your Password..." />
                    <MainButton buttonText="Register" />
                    <a href="#" className="to-reg" onClick={(e) => {
                        e.preventDefault()
                        formToggleFunc(true)
                    }}>Have an account</a>
                </div>
            </animated.div>
        </>
    )
}

export default Register