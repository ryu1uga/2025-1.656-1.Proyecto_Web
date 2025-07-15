import { useState } from "react"
import { API_URL } from "../../main"
import { useNavigate } from "react-router-dom"

const ChangeForm = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const [firstNameError, setFirstNameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [serverError, setServerError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate()

  const validateForm = (): boolean => {
    let valid = true
    setFirstNameError("")
    setEmailError("")
    setServerError("")
    setSuccessMessage("")

    if (!firstName.trim()) {
      setFirstNameError("First name is required.")
      valid = false
    }

    if (!email.trim()) {
      setEmailError("Email is required.")
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is not valid.")
      valid = false
    }

    return valid
  }

    const handleEdit = async () => {
    if (!validateForm()) return

    try {
      const res = await fetch(`${API_URL}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          email
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data?.data?.msg || "Error updating profile.")
        return
      }

      setSuccessMessage("Profile updated successfully!")
      // Redirigir después de unos segundos si quieres
      setTimeout(() => navigate("/user/home"), 2000)

    } catch (error) {
      setServerError("Error connecting to server.")
    }
  }

  return <div className="div_1 row">
    <div className="div_2 text-center col">
      <img className="logo" src="/imagenes/perfil/perfil.jpg" />
    </div>
    <div className="div_3 col">
      <form id="form_styles">
        <p>Edit your profile information</p>
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <div className="form-text text-danger">{firstNameError}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <div className="form-text text-danger">{emailError}</div>
        </div>
      </form>
    </div>
    <button type="button" className="btn-close" aria-label="Close"></button>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button className="btn btn-primary" type="button" onClick={(handleEdit)}>
        Edit information
      </button>
    </div>
  </div>
}

export default ChangeForm