import { useState } from "react"

interface ResetFormProps{
  enviar: (email: string, password: string, newPassword: string) => void
}

const ResetForm = (props : ResetFormProps) => {
  const [email, setEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
  
  const [emailError, setEmailError] = useState<string>("")
  const [newPasswordError, setNewPasswordError] = useState<string>("")
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string>("")

  const userData =
    [
        { email: "fabrizzio@email.pw"},
        { email: "gianfranco@email.pw"},
        { email: "lucas@email.pw"},
        { email: "ryuichi@email.pw"},
        { email: "giancarlo@email.pw"}
    ]

  const emailOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const newPasswordOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value)
  }

  const confirmNewPasswordOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.currentTarget.value)
  }

  const validateForm = (): boolean => {
    setEmailError("")
    setNewPasswordError("")
    setConfirmNewPasswordError("")

    let valid = true
    const user = userData.find(user => user.email === email)

    if (!email) {
      setEmailError("Email is required.")
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.")
      valid = false
    } else if (!user) {
      setEmailError("Email not found.")
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

  return <div>
    <form>
      <div className="row">
        <div className="col-12 mx-auto form-container">
          <h1>Reset your Password</h1>
          <div className="mb-3">
            <label className="form-label">Enter your account's verified <u>email address</u> and we will send you a password reset confirmation message.</label>
            <input type="email" className="form-control" value={email} onChange={emailOnChange} />
            <div className="form-text text-danger">{emailError}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">New password</label>
            <input type="password" className="form-control" value={newPassword} onChange={newPasswordOnChange} />
            <div className="form-text text-danger">{newPasswordError}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm new password</label>
            <input type="password" className="form-control" value={confirmNewPassword} onChange={confirmNewPasswordOnChange} />
            <div className="form-text text-danger">{confirmNewPasswordError}</div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={() => {
              if (validateForm()) {
                props.enviar(email, newPassword, confirmNewPassword)
              }
            }}>Send password reset email</button>
          </div>
        </div>
      </div>
    </form>  
  </div>
}

export default ResetForm