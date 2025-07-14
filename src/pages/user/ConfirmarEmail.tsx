import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ConfirmarEmail.css"

const ConfirmarEmail = () => {
    const [code, setCode] = useState<string>("")
    const [codeError, setCodeError] = useState<string>("")
    const [resendMessage, setResendMessage] = useState<boolean>(false)
    const [generalError, setGeneralError] = useState<string>("")
    const [isVerifying, setIsVerifying] = useState<boolean>(false)
    const [isResending, setIsResending] = useState<boolean>(false)
    const navigate = useNavigate()

    const email = sessionStorage.getItem("email")
    const API_BASE_URL = "http://localhost:5050"

    const codeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        if (/^\d{0,6}$/.test(value)) {
            setCode(value)
            if (codeError) setCodeError("")
            if (generalError) setGeneralError("")
        }
    }

    const validarCodigo = (): boolean => {
        setCodeError("")
        let valid = true
        
        if (!code.trim()) {
            setCodeError("Enter the code")
            valid = false
        } else if (!/^\d{6}$/.test(code)) {
            setCodeError("The code must be 6 digits.")
            valid = false
        }

        return valid
    }

    const handleVerify = async () => {
        setGeneralError("")
        if (!validarCodigo()) return

        setIsVerifying(true)
        
        try {
            const resp = await fetch(`${API_BASE_URL}/users/verify-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, code })
            })

            if (!resp.ok) {
                const text = await resp.text()
                setGeneralError(text || "Incorrect code or server error")
                return
            }

            const data = await resp.json()
            if (data.success) {
                navigate("/dashboard")
            } else {
                setGeneralError(data.data || "Incorrect code")
            }
        } catch (error) {
            console.error("Verification error:", error)
            setGeneralError("Connection error. Please try again.")
        } finally {
            setIsVerifying(false)
        }
    }

    const handleResend = async () => {
        setResendMessage(false)
        setGeneralError("")
        setIsResending(true)

        try {
            const resp = await fetch(`${API_BASE_URL}/users/send-verification-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email })
            })

            if (!resp.ok) {
                const text = await resp.text()
                setGeneralError(text || "Could not resend code")
                return
            }

            const data = await resp.json()
            if (data.success) {
                setResendMessage(true)
                setCode("")
                setTimeout(() => setResendMessage(false), 5000)
            } else {
                setGeneralError(data.data || "Could not resend code")
            }
        } catch (error) {
            console.error("Error resending:", error)
            setGeneralError("Connection error. Please try again.")
        } finally {
            setIsResending(false)
        }
    }

    const handleVolver = () => {
        navigate("/")
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isVerifying) {
            handleVerify()
        }
    }

    return (
        <div className="ConfEmail-container">
            <div className="ConfEmail-header">
                <h1 className="ConfEmail-title">CONFIRMATION</h1>
            </div>
            
            <div className="ConfEmail-content">
                <div className="ConfEmail-card">
                    <p className="ConfEmail-description">
                        We have sent you an email with a verification code to: "
                        <span className="ConfEmail-email">{email}</span>"
                    </p>
                    
                    <div className="ConfEmail-form">
                        <label className="ConfEmail-label">
                            Enter the confirmation code:
                        </label>
                        
                        <div className="ConfEmail-input-container">
                            <input
                                type="text"
                                className={`ConfEmail-input ${codeError ? 'ConfEmail-input-error' : ''}`}
                                value={code}
                                onChange={codeOnChange}
                                onKeyPress={handleKeyPress}
                                placeholder="123456"
                                maxLength={6}
                                disabled={isVerifying}
                            />
                            {codeError && (
                                <div className="ConfEmail-error">{codeError}</div>
                            )}
                            {generalError && (
                                <div className="ConfEmail-error">{generalError}</div>
                            )}
                        </div>
                        
                        <button 
                            type="button" 
                            className="ConfEmail-verify-btn" 
                            onClick={handleVerify}
                            disabled={isVerifying || code.length !== 6}
                        >
                            {isVerifying ? (
                                <>
                                    <span className="ConfEmail-spinner"></span>
                                    Verifying...
                                </>
                            ) : (
                                'VERIFY CODE'
                            )}
                        </button>
                    </div>
                    
                    <div className="ConfEmail-resend">
                        <span>Didn't receive the code? </span>
                        <button
                            type="button"
                            className="ConfEmail-resend-btn"
                            onClick={handleResend}
                            disabled={isResending}
                        >
                            {isResending ? 'Resending...' : 'Resend code'}
                        </button>
                        
                        {resendMessage && (
                            <div className="ConfEmail-success">
                                A new code has been sent to your email.
                            </div>
                        )}
                    </div>
                    
                    <div className="ConfEmail-actions">
                        <button 
                            type="button" 
                            className="ConfEmail-back-btn" 
                            onClick={handleVolver}
                            disabled={isVerifying}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmarEmail