import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NewsAddPage.css"
import { API_URL } from "../../../../main"

const NewsAddPage = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [photoUrl, setPhotoUrl] = useState<string>("")
    const [showUrlInput, setShowUrlInput] = useState<boolean>(false)
    const [nameError, setNameError] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [generalError, setGeneralError] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string>("")
    const navigate = useNavigate()
    
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

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setGeneralError("");
        setSuccessMessage("");

        try {
            const requestBody = {
                title: name,
                text: description,
                ...(photoUrl && { attachment: { url: photoUrl } }),
            };

            const resp = await fetch(`${API_URL}/news`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await resp.json();

            if (resp.ok && data.success) {
                const currentNews = JSON.parse(sessionStorage.getItem("news") || "[]");
                const newNews = {
                    id: data.data.id,
                    name: data.data.title,
                    description: data.data.text,
                    photo: data.data.attachment?.url || "",
                };
                const updatedNews = [...currentNews, newNews];
                sessionStorage.setItem("news", JSON.stringify(updatedNews));
                navigate("/admin/news");
            } else {
                setGeneralError(data.data || "Failed to create news");
            }
        } catch (error) {
            console.error("Error creating news:", error);
            setGeneralError("Connection error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin/news")
    }

    const handlePhotoClick = () => {
        setShowUrlInput(true)
    }

    const handleUrlSubmit = () => {
        setShowUrlInput(false)
    }

    const handleUrlCancel = () => {
        setPhotoUrl("")
        setShowUrlInput(false)
    }

    return (
        <div className="NewsAdd-container">
            <div className="NewsAdd-header">
                <div className="NewsAdd-header-content">
                    <h1 className="NewsAdd-title">
                        ADD A NEWS
                    </h1>
                </div>
            </div>

            <div className="NewsAdd-content">
                <div className="NewsAdd-field">
                    <label className="NewsAdd-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className={`NewsAdd-input ${nameError ? 'NewsAdd-input-error' : ''}`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (nameError) setNameError("")
                        }}
                        placeholder="Enter news title"
                        disabled={isSubmitting}
                    />
                    {nameError && (
                        <div className="NewsAdd-error">{nameError}</div>
                    )}
                </div>

                <div className="NewsAdd-field">
                    <label className="NewsAdd-label">
                        Description:
                    </label>
                    <textarea
                        className={`NewsAdd-textarea ${descriptionError ? 'NewsAdd-input-error' : ''}`}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            if (descriptionError) setDescriptionError("")
                        }}
                        placeholder="Enter news description"
                        disabled={isSubmitting}
                    />
                    {descriptionError && (
                        <div className="NewsAdd-error">{descriptionError}</div>
                    )}
                </div>

                <div className="NewsAdd-photos-section">
                    <h2 className="NewsAdd-photos-title">
                        Photos
                    </h2>
                    <div className="NewsAdd-photos-grid">
                        <button
                            type="button"
                            className="NewsAdd-photo-btn"
                            onClick={handlePhotoClick}
                            disabled={isSubmitting}
                        >
                            <div className="NewsAdd-photo-btn-content">
                                <div className="NewsAdd-photo-icon">
                                    📷
                                </div>
                                <div className="NewsAdd-photo-text">
                                    Add Photo
                                </div>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="NewsAdd-photo-btn"
                            onClick={handlePhotoClick}
                            disabled={isSubmitting}
                        >
                            <div className="NewsAdd-photo-btn-content">
                                <div className="NewsAdd-photo-icon">
                                    📷
                                </div>
                                <div className="NewsAdd-photo-text">
                                    Add Photo
                                </div>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="NewsAdd-photo-btn"
                            onClick={handlePhotoClick}
                            disabled={isSubmitting}
                        >
                            <div className="NewsAdd-photo-btn-content">
                                <div className="NewsAdd-photo-icon">
                                    📷
                                </div>
                                <div className="NewsAdd-photo-text">
                                    Add Photo
                                </div>
                            </div>
                        </button>
                    </div>
                    
                    {photoUrl && (
                        <div className="NewsAdd-photo-url">
                            <p className="NewsAdd-photo-url-text">
                                Photo URL: <span className="NewsAdd-photo-url-value">{photoUrl}</span>
                            </p>
                        </div>
                    )}
                </div>

                {showUrlInput && (
                    <div className="NewsAdd-modal-overlay">
                        <div className="NewsAdd-modal">
                            <h3 className="NewsAdd-modal-title">Add Photo URL</h3>
                            <input
                                type="url"
                                className="NewsAdd-modal-input"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="Enter photo URL"
                            />
                            <div className="NewsAdd-modal-actions">
                                <button
                                    type="button"
                                    className="NewsAdd-modal-cancel"
                                    onClick={handleUrlCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="NewsAdd-modal-submit"
                                    onClick={handleUrlSubmit}
                                >
                                    Add Photo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {successMessage && (
                    <div className="NewsAdd-success">
                        {successMessage}
                    </div>
                )}

                {generalError && (
                    <div className="NewsAdd-general-error">
                        {generalError}
                    </div>
                )}

                <div className="NewsAdd-actions">
                    <button
                        type="button"
                        className="NewsAdd-cancel-btn"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        className="NewsAdd-submit-btn"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="NewsAdd-spinner"></span>
                                Submitting...
                            </>
                        ) : (
                            'SUBMIT'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsAddPage