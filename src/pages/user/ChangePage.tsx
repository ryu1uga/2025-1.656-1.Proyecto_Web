import ChangeForm from "../../components/user/ChangeForm"
import "./ChangePage.css"

const ChangePage = () => {
  const handleChangePage = (firstName: string, lastName: string, email: string) => {
    console.log("First Name: ", firstName)
    console.log("Last Name: ", lastName)
    console.log("Email: ", email)
  }

  return <div className="centrar container mt-4">
    <ChangeForm enviar={handleChangePage}></ChangeForm>
  </div>
}

export default ChangePage