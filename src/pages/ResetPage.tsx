import ResetForm from "../components/ResetForm"
import "./ResetPage.css"

const ResetPage = () => {
  return (
    <div className="ResetPage-container">
      <div className="ResetPage-header">
        <h1>Reset Password</h1>
      </div>
      <div className="ResetPage-form">
        <ResetForm />
      </div>
    </div>
  )
}

export default ResetPage