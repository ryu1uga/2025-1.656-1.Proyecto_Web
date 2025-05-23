import RegisterForm from "../components/RegisterForm"
import "./RegisterPage.css"

const RegisterPage = () => {

    const handleRegister = (name : string, email: string, password: string, confirmPassword : string, agree: boolean) => {
        console.log("Name:", name)
        console.log("Email:", email)
        console.log("Password:", password)
        console.log("ConfirmPassword:", confirmPassword)
        console.log("Agree:", agree)
    }
    
    return <div className="container">
        <RegisterForm enviar={ handleRegister }></RegisterForm>
    </div>
}

export default RegisterPage