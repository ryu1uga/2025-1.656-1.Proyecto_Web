import ResetForm from "../components/ResetForm"
import "./ResetPage.css"

const ResetPage = () => {
  const handlePasswordReset = (email: string, newPassword: string, confirmNewPassword: string) => {
    console.log("Email: ", email)
    console.log("Password: ", newPassword)
    console.log("New Password: ", confirmNewPassword)
  }

  return <div className="container"> 
    <ResetForm enviar={ handlePasswordReset }></ResetForm> 
  </div>
}

export default ResetPage