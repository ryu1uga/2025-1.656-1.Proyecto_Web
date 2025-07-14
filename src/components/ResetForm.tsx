import { useState } from "react"
import { API_URL } from "../main"

const ResetForm = () => {
  const [email, setEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
  
  const [emailError, setEmailError] = useState<string>("")
  const [newPasswordError, setNewPasswordError] = useState<string>("")
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string>("")
  const [serverError, setServerError] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  const emailOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const newPasswordOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const confirmNewPasswordOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value)
  }

  const validateForm = (): boolean => {
    setEmailError("")
    setNewPasswordError("")
    setConfirmNewPasswordError("")
    setServerError("")
    setSuccessMessage("")

    let valid = true

    if (!email.trim()) {
      setEmailError("Email is required.")
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.")
      valid = false
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.")
      valid = false
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(newPassword)) {
      setNewPasswordError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
      valid = false
    }

    if (!confirmNewPassword) {
      setConfirmNewPasswordError("Please confirm your new password.")
      valid = false
    } else if (confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError("Passwords do not match.")
      valid = false
    }

    return valid
  }

  const handleResetPassword = async () => {
    if (!validateForm()) return

    try {
      const response = await fetch(`${API_URL}/users/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword })
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 404) {
          setEmailError("Email not found.")
        } else {
          setServerError(data?.message || "Error resetting password.")
        }
        return
      }

      setSuccessMessage("Password reset successfully. You can now log in.")
      setEmail("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (error) {
      setServerError("Error connecting to the server.")
    }
  }

  return (
    <div>
      <form>
        {serverError && <div className="ResetPage-server-error">{serverError}</div>}
        {successMessage && <div className="ResetPage-success">{successMessage}</div>}
        
        <div className="ResetPage-form-group">
          <label className="ResetPage-label">
            Enter your account's verified <u>email address</u> and we will send you a password reset confirmation message.
          </label>
          <input 
            type="email" 
            className="ResetPage-input" 
            value={email} 
            onChange={emailOnChange} 
          />
          {emailError && <div className="ResetPage-error">{emailError}</div>}
        </div>
        
        <div className="ResetPage-form-group">
          <label className="ResetPage-label">New password</label>
          <input 
            type="password" 
            className="ResetPage-input" 
            value={newPassword} 
            onChange={newPasswordOnChange} 
          />
          {newPasswordError && <div className="ResetPage-error">{newPasswordError}</div>}
        </div>
        
        <div className="ResetPage-form-group">
          <label className="ResetPage-label">Confirm new password</label>
          <input 
            type="password" 
            className="ResetPage-input" 
            value={confirmNewPassword} 
            onChange={confirmNewPasswordOnChange} 
          />
          {confirmNewPasswordError && <div className="ResetPage-error">{confirmNewPasswordError}</div>}
        </div>
        
        <div className="ResetPage-button-container">
          <button type="button" className="ResetPage-button" onClick={handleResetPassword}>
            Send password reset email
          </button>
        </div>
      </form>  
    </div>
  )
}

export default ResetForm