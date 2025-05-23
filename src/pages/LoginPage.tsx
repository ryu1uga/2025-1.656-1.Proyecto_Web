import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import "./LoginPage.css"

const LoginPage = () => {

    const navigate = useNavigate();
    const login = (email: string, password: string, rememberMe: boolean, userstate: number) => {
        console.log("Email:", email)
        console.log("Password:", password)
        console.log("Remember me:", rememberMe)
        if (userstate == 0)
        {
            navigate("/user/home");
        }
        else if (userstate == 1)
        {
            navigate("/admin");
        }
    }

    return <div className="container">
        <LoginForm enviar={ login }></LoginForm>
    </div>
}

export default LoginPage