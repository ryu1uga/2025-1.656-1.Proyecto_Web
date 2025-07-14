import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { API_URL } from "../main"

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agree, setAgree] = useState(false)

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [agreeError, setAgreeError] = useState("")
    const [serverError, setServerError] = useState("")

    const navigate = useNavigate()

    const validateForm = (): boolean => {
        setNameError("")
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
        setAgreeError("")
        setServerError("")

        let valid = true

        if (!name.trim()) {
            setNameError("Name is required.")
            valid = false
        }

        if (!email.trim()) {
            setEmailError("Email is required.")
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is not valid.")
            valid = false
        }

        if (!password) {
            setPasswordError("Password is required.")
            valid = false
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
            setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
            valid = false
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password.")
            valid = false
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.")
            valid = false
        }

        if (!agree) {
            setAgreeError("You must accept the terms and conditions.")
            valid = false
        }

        return valid
    }

    const handleRegister = async () => {
        if (!validateForm()) return

        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 409) {
                    setEmailError("A user with this email already exists.")
                } else {
                    setServerError(data?.data?.msg || "An error occurred during registration.")
                }
                return
            }

            // Puedes almacenar el token aquí si es necesario
            // localStorage.setItem("token", data.data.token)
            sessionStorage.setItem("email", email)
            navigate("/confirmar")
        } catch (error) {
            setServerError("Error connecting to server.")
        }
    }

    return (
        <div className="RegisterPage-container">
            <div className="RegisterPage-header">
                <h1>REGISTRO</h1>
            </div>
            <div className="RegisterPage-form">
                {serverError && <div className="RegisterPage-server-error">{serverError}</div>}
                
                <div className="RegisterPage-form-group">
                    <label className="RegisterPage-label">Nombre</label>
                    <input 
                        type="text" 
                        className="RegisterPage-input" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                    />
                    {nameError && <div className="RegisterPage-error">{nameError}</div>}
                </div>
                
                <div className="RegisterPage-form-group">
                    <label className="RegisterPage-label">Email</label>
                    <input 
                        type="email" 
                        className="RegisterPage-input" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    {emailError && <div className="RegisterPage-error">{emailError}</div>}
                </div>
                
                <div className="RegisterPage-form-group">
                    <label className="RegisterPage-label">Contraseña</label>
                    <input 
                        type="password" 
                        className="RegisterPage-input" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    {passwordError && <div className="RegisterPage-error">{passwordError}</div>}
                </div>
                
                <div className="RegisterPage-form-group">
                    <label className="RegisterPage-label">Confirmar contraseña</label>
                    <input 
                        type="password" 
                        className="RegisterPage-input" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                    />
                    {confirmPasswordError && <div className="RegisterPage-error">{confirmPasswordError}</div>}
                </div>
                
                <div className="RegisterPage-checkbox-group">
                    <label className="RegisterPage-checkbox-label">
                        <input 
                            type="checkbox" 
                            className="RegisterPage-checkbox" 
                            checked={agree} 
                            onChange={e => setAgree(e.target.checked)} 
                        />
                        <span className="RegisterPage-checkbox-text">
                            Acepto los <Link to={""} className="RegisterPage-link">Términos y Condiciones</Link>
                        </span>
                    </label>
                    {agreeError && <div className="RegisterPage-error">{agreeError}</div>}
                </div>
                
                <div className="RegisterPage-links">
                    <div className="RegisterPage-link-item">
                        <span>¿Ya tienes cuenta? </span>
                        <Link to={"../"} className="RegisterPage-link">Inicia sesión aquí</Link>
                    </div>
                </div>
                
                <div className="RegisterPage-button-container">
                    <button 
                        type="button" 
                        className="RegisterPage-button" 
                        onClick={handleRegister}
                    >
                        REGISTRARSE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm