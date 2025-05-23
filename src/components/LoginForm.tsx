import { useState } from "react"
import { Link } from "react-router-dom"

interface LoginFormProps {
    enviar: (email: string, password: string, rememberMe: boolean, userstate: number) => void
}

const LoginForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

    const userData =
    [
        { email: "fabrizzio@email.pw", password: "Fabrizzio_PW", userstate : 0 },
        { email: "gianfranco@email.pw", password: "Gianfranco_PW", userstate : 0 },
        { email: "lucas@email.pw", password: "Lucas_PW", userstate : 0 },
        { email: "ryuichi@email.pw", password: "Ryuichi_PW", userstate : 1 },
        { email: "giancarlo@email.pw", password: "Giancarlo_PW", userstate : 1 }
    ]

    const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const rememberMeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }

    const validateForm = (): { user: { userstate: number } } | null => {
        setEmailError("")
        setPasswordError("")
        let valid = true
    
        const user = userData.find(user => user.email === email)
    
        if (!email) {
            setEmailError("Email is required.")
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is not valid.")
            valid = false
        } else if (!user) {
            setEmailError("Email is not registered yet.")
            valid = false
        }
    
        if (!password) {
            setPasswordError("Password is required.")
            valid = false
        } else if (user && user.password !== password) {
            setPasswordError("Incorrect password.")
            valid = false
        }
    
        return valid && user ? { user } : null
    }    

    return <div>
        <form>
            <div className="row">
                <div className="col-12 mx-auto form-container">
                    <h1>Login</h1>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={emailOnChange} />
                        <div className="form-text text-danger">{emailError}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={passwordOnChange} />
                        <div className="form-text text-danger">{passwordError}</div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={rememberMe} onChange={rememberMeOnChange} />
                        <label className="form-check-label">Remember me</label>
                    </div>
                    <div className="col-12 mx-auto form-container mb-3">
                        <span>Forgot your password? </span>
                        <Link to={"../reset"}>Click here</Link>
                    </div>
                    <div className="col-12 mx-auto form-container mb-3">
                        <span>You're not our member yet? </span>
                        <Link to={"../register"}>Register here</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={() => {
                        const result = validateForm()
                        if (result) {
                            props.enviar(email, password, rememberMe, result.user.userstate)
                        }
                    }}>LOGIN</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
}

export default LoginForm