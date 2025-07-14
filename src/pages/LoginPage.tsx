import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import "./LoginPage.css"

const LoginPage = () => {

    const navigate = useNavigate();
    const login = (username: string, email: string, token: string, usertype: number, state: number) => {
        console.log("Username:", username)
        console.log("Email:", email)
        console.log("Token:", token)
        console.log("UserType:", usertype)
        console.log("state:", state)

        sessionStorage.setItem("user", username)
        if (usertype == 0)
        {
            navigate("/user/home");
        }
        else if (usertype == 1)
        {
            navigate("/admin");
        }
    }

    return <div className="container">
        <LoginForm enviar={ login }></LoginForm>
    </div>
}

export default LoginPage