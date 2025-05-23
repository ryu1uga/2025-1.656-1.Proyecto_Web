import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface ConfEmailProps {
    enviar: (code: string) => void
}

const ConfirmarEmail = (props: ConfEmailProps) => {
    const [code, setCode] = useState<string>("")
    const [codeError, setCodeError] = useState<string>("")
    const [resendMessage, setResendMessage] = useState<boolean>(false)
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

    const handleResend = () => {
        setResendMessage(true)
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
                    <p>Para confirmar tu identidad, te hemos enviado un correo con un código de verificación que debes ingresar en el cuadro de texto a continuación.</p>
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
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() =>
                    {
                            if (validarCodigo()) 
                                {
                                props.enviar(code)
                                }
                        }}
                    >
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