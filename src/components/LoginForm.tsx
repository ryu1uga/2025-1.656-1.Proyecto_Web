import { useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../main"

interface LoginFormProps {
    enviar: (id: number, username: string, email: string, password: string, usertype: number, state: number) => void
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
                    console.log("Unknown login error")
                }
                return
            }

            props.enviar(json.data.id, json.data.username, json.data.email, json.data.token, json.data.usertype, json.data.state)

        } catch (error) {
            console.error("Error during login:", error)
        }
    }

    return (
        <div className="LoginPage-container">
            <div className="LoginPage-header">
                <h1>INICIO DE SESIÓN</h1>
            </div>
            <div className="LoginPage-form">
                <div className="LoginPage-form-group">
                    <label className="LoginPage-label">Email</label>
                    <input 
                        type="email" 
                        className="LoginPage-input" 
                        value={email} 
                        onChange={emailOnChange}
                        placeholder=""
                    />
                    {emailError && <div className="LoginPage-error">{emailError}</div>}
                </div>
                
                <div className="LoginPage-form-group">
                    <label className="LoginPage-label">Contraseña</label>
                    <input 
                        type="password" 
                        className="LoginPage-input" 
                        value={password} 
                        onChange={passwordOnChange}
                        placeholder=""
                    />
                    {passwordError && <div className="LoginPage-error">{passwordError}</div>}
                </div>
                
                <div className="LoginPage-links">
                    <div className="LoginPage-link-item">
                        <span>¿Olvidaste tu contraseña? </span>
                        <Link to={"../user/reset"} className="LoginPage-link">Click here</Link>
                    </div>
                    <div className="LoginPage-link-item">
                        <span>¿Aún no eres miembro? </span>
                        <Link to={"../register"} className="LoginPage-link">Register here</Link>
                    </div>
                </div>
                
                <div className="LoginPage-button-container">
                    <button 
                        type="button" 
                        className="LoginPage-button" 
                        onClick={login}
                    >
                        INGRESAR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm