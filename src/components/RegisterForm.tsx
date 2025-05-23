import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface RegisterFormProps {
    enviar: (name: string, email: string, password: string, confirmPassword: string, rememberMe: boolean) => void
}

const RegisterForm = (props: RegisterFormProps) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [agree, setAgree] = useState<boolean>(false)
    const [nameError, setNameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")
    const [agreeError, setAgreeError] = useState<string>("")

    const navigate = useNavigate()

    const nameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const confirmPasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const agreeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgree(e.currentTarget.checked)
    }

    const validateForm = (): boolean => {
        setNameError("")
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
        setAgreeError("")
        let valid = true
        
        if (!name.trim())
        {
            setNameError("Name is required.")
            valid = false
        }

        if (!email.trim())  
        {
            setEmailError("Email is required.")
            valid = false
        }
        else if (!/\S+@\S+\.\S+/.test(email))
        {
            setEmailError("Email is not valid.")
            valid = false
        }

        if (!password)
        {
            setPasswordError("Password is required.")
            valid = false
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password))
        {
            setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
            valid = false
        }
        
        if (!confirmPassword)  
        {
            setConfirmPasswordError("Please confirm your password.")
            valid = false
        }
        else if (password !== confirmPassword)
        {
            setConfirmPasswordError("Passwords do not match.")
            valid = false
        }

        if (!agree) {
            setAgreeError("You must accept the terms and conditions.")
            valid = false
        }

        return valid
    }

    const handleRegister = () => {
        if (validateForm()) {
            props.enviar(name, email, password, confirmPassword, agree)
            navigate("/user/confirmar")
        }
    }

    return <div>
        <form>
            <div className="row">
                <div className="col-12 mx-auto form-container">
                    <h1>Register</h1>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={nameOnChange} />
                        <div className="form-text text-danger">{nameError}</div>
                    </div>
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
                    <div className="mb-3">
                        <label className="form-label">Confirm your password</label>
                        <input type="password" className="form-control" value={confirmPassword} onChange={confirmPasswordOnChange} />
                        <div className="form-text text-danger">{confirmPasswordError}</div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" checked={agree} onChange={agreeOnChange} />
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
}

export default RegisterForm