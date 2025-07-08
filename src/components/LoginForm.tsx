import { useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../main"

interface LoginFormProps {
    enviar: (email: string, password: string, usertype: number, state: number) => void
}

const LoginForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

    const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const validateForm = (): boolean => {
        setEmailError("")
        setPasswordError("")
        let valid = true

        if (!email) {
            setEmailError("Email is required.")
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is not valid.")
            valid = false
        }

        if (!password) {
            setPasswordError("Password is required.")
            valid = false
        }

        return valid
    }

    const login = async () => {
        if (!validateForm()) return

        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const json = await res.json()

            if (!json.success) {
                if (json.data === "Email not registered") {
                    setEmailError("Email is not registered yet.")
                } else if (json.data === "Invalid password") {
                    setPasswordError("Incorrect password.")
                } else {
                    alert("Unknown login error")
                }
                return
            }

            props.enviar(json.data.email, json.data.token, json.data.usertype, json.data.state)

        } catch (error) {
            console.error("Error during login:", error)
            alert("Error connecting to the server.")
        }
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
                    <div className="col-12 mx-auto form-container mb-3">
                        <span>Forgot your password? </span>
                        <Link to={"../user/reset"}>Click here</Link>
                    </div>
                    <div className="col-12 mx-auto form-container mb-3">
                        <span>You're not our member yet? </span>
                        <Link to={"../register"}>Register here</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={login}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
}

export default LoginForm