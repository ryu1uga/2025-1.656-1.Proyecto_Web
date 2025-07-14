import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./GameAddPage.css"
import type { juego } from "../../../../components/user/HomeJuego"
import { API_URL } from "../../../../main"

const GameAddPage = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [company, setCompany] = useState<string>("")
    const [categoryName, setCategoryName] = useState<string>("")
    const [categoryId, setCategoryId] = useState<number | "">("")
    const [attachmentUrl, setAttachmentUrl] = useState<string>("")
    const [photos, setPhotos] = useState<string[]>([])
    const [trailers, setTrailers] = useState<string[]>([])
    const [showUrlInput, setShowUrlInput] = useState<boolean>(false)
    const [nameError, setNameError] = useState<string>("")
    const [companyError, setCompanyError] = useState<string>("")
    const [categoryIdError, setCategoryIdError] = useState<string>("")
    const [generalError, setGeneralError] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [platforms, setPlatforms] = useState<string>("")
    const navigate = useNavigate()

    const validateForm = (): boolean => {
        setNameError("")
        setCompanyError("")
        setCategoryIdError("")
        setGeneralError("")
        let valid = true

        if (!name.trim()) {
            setNameError("Name is required")
            valid = false
        }

        if (!company.trim()) {
            setCompanyError("Company is required")
            valid = false
        }

        if (!categoryId) {
            setCategoryIdError("Category ID is required")
            valid = false
        }

        return valid
    }

    const handleAddGame = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setGeneralError("");
        setSuccessMessage("");

        try {
            const response = await fetch(`${API_URL}/games`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    price,
                    description,
                    company: company.trim(),
                    state: 1,
                    category: Number(categoryId),
                    plataformas: platforms.trim(),
                    images: photos,
                    trailers: trailers,
                    attachment: {
                        url: attachmentUrl
                    }
                })
            });

            if (!response.ok) {
                throw new Error("Error adding game to backend");
            }

            const createdGame: juego = await response.json();

            const juegosAnterioresStr = sessionStorage.getItem("listaJuegos");
            const juegos: juego[] = juegosAnterioresStr ? JSON.parse(juegosAnterioresStr) : [];
            juegos.push(createdGame);
            sessionStorage.setItem("listaJuegos", JSON.stringify(juegos));

            setSuccessMessage("Game added successfully");
            setTimeout(() => navigate("/admin/game"), 1000);
        } catch (error) {
            console.error(error);
            setGeneralError("Failed to add game. Please try again.");
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin/game")
    }

    const handleAddPhoto = () => {
        setShowUrlInput(true)
    }

    const handleUrlSubmit = () => {
        if (photoUrl) setPhotos([...photos, photoUrl])
        setPhotoUrl("")
        setShowUrlInput(false)
    }

    const handleUrlCancel = () => {
        setPhotoUrl("")
        setShowUrlInput(false)
    }

    const handleDeletePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index))
    }

    const handleAddTrailer = () => {
        setTrailers([...trailers, ""])
    }

    const handleDeleteTrailer = (index: number) => {
        setTrailers(trailers.filter((_, i) => i !== index))
    }

    const handleTrailerChange = (index: number, value: string) => {
        const updated = [...trailers]
        updated[index] = value
        setTrailers(updated)
    }

    const [photoUrl, setPhotoUrl] = useState<string>("")

    return (
        <div className="GameAdd-container">
            <div className="GameAdd-header">
                <div className="GameAdd-header-content">
                    <h1 className="GameAdd-title">
                        Add a New Game
                    </h1>
                </div>
            </div>
            <div className="GameAdd-content">
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        className={`GameAdd-input ${nameError ? 'GameAdd-input-error' : ''}`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (nameError) setNameError("")
                        }}
                        placeholder="Game Name"
                        disabled={isSubmitting}
                    />
                    {nameError && (
                        <div className="GameAdd-error">{nameError}</div>
                    )}
                </div>
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Price:
                    </label>
                    <input
                        type="number"
                        className={`GameAdd-input ${nameError ? 'GameAdd-input-error' : ''}`}
                        value={price}
                        onChange={(e) => {
                            setPrice(Number(e.target.value))
                        }}
                        placeholder="Price"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Company:
                    </label>
                    <input
                        type="text"
                        className={`GameAdd-input ${companyError ? 'GameAdd-input-error' : ''}`}
                        value={company}
                        onChange={(e) => {
                            setCompany(e.target.value)
                            if (companyError) setCompanyError("")
                        }}
                        placeholder="Company"
                        disabled={isSubmitting}
                    />
                    {companyError && (
                        <div className="GameAdd-error">{companyError}</div>
                    )}
                </div>
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Platforms:
                    </label>
                    <input
                        type="text"
                        className="GameAdd-input"
                        value={platforms}
                        onChange={(e) => setPlatforms(e.target.value)}
                        placeholder="e.g., PC, PS5, Xbox"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Category ID:
                    </label>
                    <input
                        type="number"
                        className={`GameAdd-input ${categoryIdError ? 'GameAdd-input-error' : ''}`}
                        value={categoryId}
                        onChange={(e) => {
                            const val = e.target.value
                            setCategoryId(val === "" ? "" : Number(val))
                            if (categoryIdError) setCategoryIdError("")
                        }}
                        placeholder="Category ID"
                        disabled={isSubmitting}
                    />
                    {categoryIdError && (
                        <div className="GameAdd-error">{categoryIdError}</div>
                    )}
                </div>
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Description:
                    </label>
                    <textarea
                        className={`GameAdd-textarea ${nameError ? 'GameAdd-input-error' : ''}`}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        placeholder="Description"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="GameAdd-field">
                    <label className="GameAdd-label">
                        Attachment URL:
                    </label>
                    <input
                        type="text"
                        className={`GameAdd-input ${nameError ? 'GameAdd-input-error' : ''}`}
                        value={attachmentUrl}
                        onChange={(e) => {
                            setAttachmentUrl(e.target.value)
                        }}
                        placeholder="Attachment URL"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="GameAdd-photos-section">
                    <h2 className="GameAdd-photos-title">
                        Gallery
                    </h2>
                    <div className="GameAdd-photos-grid">
                        {photos.map((photo, index) => (
                            <button
                                type="button"
                                className="GameAdd-photo-btn"
                                key={index}
                                onClick={() => handleDeletePhoto(index)}
                                disabled={isSubmitting}
                            >
                                <div className="GameAdd-photo-btn-content">
                                    <div className="GameAdd-photo-icon">
                                        📷
                                    </div>
                                    <div className="GameAdd-photo-text">
                                        {photo}
                                    </div>
                                </div>
                            </button>
                        ))}
                        <button
                            type="button"
                            className="GameAdd-photo-btn"
                            onClick={handleAddPhoto}
                            disabled={isSubmitting}
                        >
                            <div className="GameAdd-photo-btn-content">
                                <div className="GameAdd-photo-icon">
                                    📷
                                </div>
                                <div className="GameAdd-photo-text">
                                    Add Photo
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                {showUrlInput && (
                    <div className="GameAdd-modal-overlay">
                        <div className="GameAdd-modal">
                            <h3 className="GameAdd-modal-title">Add Photo URL</h3>
                            <input
                                type="url"
                                className="GameAdd-modal-input"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="Enter photo URL"
                            />
                            <div className="GameAdd-modal-actions">
                                <button
                                    type="button"
                                    className="GameAdd-modal-cancel"
                                    onClick={handleUrlCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="GameAdd-modal-submit"
                                    onClick={handleUrlSubmit}
                                >
                                    Add Photo
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="GameAdd-photos-section">
                    <h2 className="GameAdd-photos-title">
                        Trailers
                    </h2>
                    <div className="GameAdd-photos-grid">
                        {trailers.map((trailer, index) => (
                            <div key={index} className="GameAdd-photo-btn-content">
                                <textarea
                                    className={`GameAdd-textarea ${nameError ? 'GameAdd-input-error' : ''}`}
                                    value={trailer}
                                    onChange={(e) => handleTrailerChange(index, e.target.value)}
                                    placeholder={`Trailer ${index + 1}`}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="GameAdd-modal-cancel"
                                    onClick={() => handleDeleteTrailer(index)}
                                    disabled={isSubmitting}
                                >
                                    Delete Trailer
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="GameAdd-photo-btn"
                            onClick={handleAddTrailer}
                            disabled={isSubmitting}
                        >
                            <div className="GameAdd-photo-btn-content">
                                <div className="GameAdd-photo-icon">
                                    🎥
                                </div>
                                <div className="GameAdd-photo-text">
                                    Add Trailer
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                {successMessage && (
                    <div className="GameAdd-success">
                        {successMessage}
                    </div>
                )}
                {generalError && (
                    <div className="GameAdd-general-error">
                        {generalError}
                    </div>
                )}
                <div className="GameAdd-actions">
                    <button
                        type="button"
                        className="GameAdd-cancel-btn"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        className="GameAdd-submit-btn"
                        onClick={handleAddGame}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="GameAdd-spinner"></span>
                                Submitting...
                            </>
                        ) : (
                            'Add'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameAddPage