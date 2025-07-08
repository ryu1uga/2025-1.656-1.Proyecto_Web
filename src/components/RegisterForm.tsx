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

            navigate("/user/home")
        } catch (error) {
            setServerError("Error connecting to server.")
        }
    }

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-12 mx-auto form-container">
                        <h1>Register</h1>
                        {serverError && <div className="alert alert-danger">{serverError}</div>}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                            <div className="form-text text-danger">{nameError}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            <div className="form-text text-danger">{emailError}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="form-text text-danger">{passwordError}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm your password</label>
                            <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <div className="form-text text-danger">{confirmPasswordError}</div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" checked={agree} onChange={e => setAgree(e.target.checked)} />
                            <label className="form-check-label">I Agree to the <Link to={""}>Terms and Conditions</Link></label>
                            <div className="form-text text-danger">{agreeError}</div>
                        </div>
                        <div className="col-12 mx-auto form-container mb-3">
                            <span>You're already registered? </span>
                            <Link to={"../"}>Login here</Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={handleRegister}>REGISTER</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm