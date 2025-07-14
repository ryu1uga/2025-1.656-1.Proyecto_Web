import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface ConfEmailProps {
    email: string
}

const ConfirmarEmail = (props: ConfEmailProps) => {
    const [code, setCode] = useState<string>("")
    const [codeError, setCodeError] = useState<string>("")
    const [resendMessage, setResendMessage] = useState<boolean>(false)
    const [generalError, setGeneralError] = useState<string>("")
    const navigate = useNavigate()

    const codeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.currentTarget.value)
    }

    const validarCodigo = (): boolean => {
        setCodeError("")
        let valid = true
        
        if (!code.trim()) {
            setCodeError("Ingresa el código")
            valid = false
        } else if (!/^\d{6}$/.test(code)) {
            setCodeError("El código debe ser de 6 dígitos.")
            valid = false
        }

        return valid
    }

    const handleVerify = async () => {
        setGeneralError("")
        if (!validarCodigo()) return

        try {
            const resp = await fetch("/users/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: props.email, code })
            })
            const data = await resp.json()

            if (resp.ok && data.success) {
                // Por ejemplo, navegar a otra página:
                navigate("/dashboard")
            } else {
                setGeneralError(data.data || "Código incorrecto")
            }
        } catch (e) {
            setGeneralError("Error de red o del servidor")
        }
    }

    const handleResend = async () => {
        setResendMessage(false)
        setGeneralError("")

        try {
            const resp = await fetch("/users/send-verification-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: props.email })
            })
            const data = await resp.json()

            if (resp.ok && data.success) {
                setResendMessage(true)
            } else {
                setGeneralError(data.data || "No se pudo reenviar el código")
            }
        } catch (e) {
            setGeneralError("Error de red o del servidor")
        }
    }

    const Volver = () => {
        navigate("/")
    }

    return (
        <div>
            <div className="container mt-4 text-center">
                <img src="" alt="Logo" className="mb-3" style={{ maxWidth: "150px" }} />
                <h2>Por favor confirma tu identidad</h2>
                <div className="card p-4 mt-4" style={{ maxWidth: "400px", margin: "auto" }}>
                    <p>Te hemos enviado un correo con un código de verificación.</p>
                    <div className="mb-3">
                        <label className="form-label">Ingresa el código de confirmación:</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={code}
                            onChange={codeOnChange}
                            placeholder="- - - - - -"
                        />
                        <div className="form-text text-danger">{codeError}</div>
                        <div className="form-text text-danger">{generalError}</div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleVerify}>
                        Verificar código
                    </button>
                </div>
                <div className="mt-3">
                    <span>¿No recibiste el código?</span>
                    <span 
                        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} 
                        onClick={handleResend}
                    >
                        Reenviar código
                    </span>
                    {resendMessage && (
                        <div className="mt-2 form-text text-info">
                            Se envió un nuevo código a su correo.
                        </div>
                    )}
                </div>
                <div className="mt-3">
                    <button type="button" className="btn btn-secondary" onClick={Volver}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmarEmail
