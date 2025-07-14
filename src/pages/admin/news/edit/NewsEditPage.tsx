import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NewsEditPage.css"
import { API_URL } from "../../../../main"

interface News {
    id: number;
    name: string;
    description: string;
    photo: string;
}

const NewsEditPage = () => {
    const navigate = useNavigate()
    const stored = sessionStorage.getItem("selectedNews")
    const parsed: News | null = stored ? JSON.parse(stored) : null

    const [name, setName] = useState(parsed?.name || "")
    const [description, setDescription] = useState(parsed?.description || "")
    const [photoUrl, setPhotoUrl] = useState(parsed?.photo || "")
    const [nameError, setNameError] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [generalError, setGeneralError] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    if (!parsed) {
        return <div className="NewsEdit-container mt-4">No news selected to edit.</div>
    }

    const validateForm = (): boolean => {
        setNameError("")
        setDescriptionError("")
        setGeneralError("")
        let valid = true

        if (!name.trim()) {
            setNameError("Name is required")
            valid = false
        }

        if (!description.trim()) {
            setDescriptionError("Description is required")
            valid = false
        }

        return valid
    }

    const handleSave = async () => {
        if (!validateForm()) return

        setIsSubmitting(true)
        setGeneralError("")

        try {
            const requestBody = {
                title: name,
                text: description,
                ...(photoUrl && { attachment: { url: photoUrl } })
            }

            const resp = await fetch(`${API_URL}/news/${parsed.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            })

            const data = await resp.json()

            if (resp.ok && data.success) {
                // Actualizar sessionStorage
                const newsStr = sessionStorage.getItem("news")
                const news: News[] = newsStr ? JSON.parse(newsStr) : []
                const updatedNews: News = {
                    id: parsed.id,
                    name,
                    description,
                    photo: photoUrl
                }
                const actualizados = news.map((n) => n.id === parsed.id ? updatedNews : n)
                sessionStorage.setItem("news", JSON.stringify(actualizados))
                // Actualizar selectedNews
                sessionStorage.setItem("selectedNews", JSON.stringify(updatedNews))
                navigate("/admin/news")
            } else {
                setGeneralError(data.data || "Failed to update news")
            }
        } catch (error) {
            console.error("Error updating news:", error)
            setGeneralError("Connection error. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAddAttachment = () => {
        const url = prompt("Enter new attachment URL")
        if (url) {
            setPhotoUrl(url)
        }
    }

    const handleDeleteAttachment = () => {
        setPhotoUrl("")
    }

    return (
        <div className="NewsEdit-container">
            <div className="NewsEdit-header">
                <div className="NewsEdit-header-content">
                    <h1 className="NewsEdit-title">
                        Edit News
                    </h1>
                </div>
            </div>
            <div className="NewsEdit-content">
                <div className="NewsEdit-field">
                    <label className="NewsEdit-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className={`NewsEdit-input ${nameError ? 'NewsEdit-input-error' : ''}`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (nameError) setNameError("")
                        }}
                        disabled={isSubmitting}
                    />
                    {nameError && (
                        <div className="NewsEdit-error">{nameError}</div>
                    )}
                </div>
                <div className="NewsEdit-field">
                    <label className="NewsEdit-label">
                        Description:
                    </label>
                    <textarea
                        className={`NewsEdit-textarea ${descriptionError ? 'NewsEdit-input-error' : ''}`}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            if (descriptionError) setDescriptionError("")
                        }}
                        disabled={isSubmitting}
                    />
                    {descriptionError && (
                        <div className="NewsEdit-error">{descriptionError}</div>
                    )}
                </div>
                <div className="NewsEdit-field">
                    <label className="NewsEdit-label">
                        Attachment URL:
                    </label>
                    <input
                        type="text"
                        className="NewsEdit-input"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        disabled={isSubmitting}
                    />
                    <div className="NewsEdit-photos-grid mt-2">
                        <button
                            type="button"
                            className="NewsEdit-photo-btn"
                            onClick={handleAddAttachment}
                            disabled={isSubmitting}
                        >
                            <div className="NewsEdit-photo-btn-content">
                                <div className="NewsEdit-photo-icon">
                                    📎
                                </div>
                                <div className="NewsEdit-photo-text">
                                    Add Attachment
                                </div>
                            </div>
                        </button>
                        {photoUrl && (
                            <button
                                type="button"
                                className="NewsEdit-photo-btn"
                                onClick={handleDeleteAttachment}
                                disabled={isSubmitting}
                            >
                                <div className="NewsEdit-photo-btn-content">
                                    <div className="NewsEdit-photo-icon">
                                        ❌
                                    </div>
                                    <div className="NewsEdit-photo-text">
                                        Delete Attachment
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
                {generalError && (
                    <div className="NewsEdit-general-error">
                        {generalError}
                    </div>
                )}
                <div className="NewsEdit-actions">
                    <button
                        type="button"
                        className="NewsEdit-cancel-btn"
                        onClick={() => navigate("/admin/news")}
                        disabled={isSubmitting}
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        className="NewsEdit-submit-btn"
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="NewsEdit-spinner"></span>
                                Saving...
                            </>
                        ) : (
                            'SAVE CHANGES'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsEditPage