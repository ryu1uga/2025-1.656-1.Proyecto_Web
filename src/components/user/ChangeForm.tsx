import { useState } from "react"

interface ChangeFormProps {
  enviar: (firstName: string, lastName: string, email: string) => void
}

const ChangeForm = (props: ChangeFormProps) => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const [firstNameError, setFirstNameError] = useState<string>("")
  const [lastNameError, setLastNameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")

  const firstNameOnChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    setFirstName(e.currentTarget.value)
  }

  const lastNameOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value)
  }

  const emailOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const validateForm = (): boolean => {
    let valid = true
    setFirstNameError("")
    setLastNameError("")
    setEmailError("")

    if (!firstName.trim()) {
      setFirstNameError("First name is required.")
      valid = false
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required.")
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

  return <div className="div_1 row">
    <div className="div_2 text-center col">
      <img className="logo" src="/imagenes/perfil/perfil.jpg" />
    </div>
    <div className="div_3 col">
      <form id="form_styles">
        <p>Edit your profile information</p>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" onChange={firstNameOnChange}/>
          <div className="form-text text-danger">{firstNameError}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" onChange={lastNameOnChange}/>
          <div className="form-text text-danger">{lastNameError}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" onChange={emailOnChange}/>
          <div className="form-text text-danger">{emailError}</div>
        </div>
      </form>
    </div>
    <button type="button" className="btn-close" aria-label="Close"></button>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button className="btn btn-primary" type="button" onClick={() => { 
        if(validateForm()){
          props.enviar(firstName, lastName, email)
        }
      }}>Edit information</button>
    </div>
  </div>
}

export default ChangeForm