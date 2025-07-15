import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
    const { id } = useParams<{ id: string }>()
    
    const [news, setNews] = useState<News | null>(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [nameError, setNameError] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [generalError, setGeneralError] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Cargar la noticia desde la API usando el ID
    useEffect(() => {
        const fetchNews = async () => {
            if (!id) {
                setGeneralError("No news ID provided")
                setIsLoading(false)
                return
            }

            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/news/${id}`)
                const data = await response.json()

                if (response.ok && data.success) {
                    const newsData: News = {
                        id: data.data.id,
                        name: data.data.title || data.data.name,
                        description: data.data.text || data.data.description,
                        photo: data.data.attachment?.url || data.data.photo || ""
                    }
                    
                    setNews(newsData)
                    setName(newsData.name)
                    setDescription(newsData.description)
                    setPhotoUrl(newsData.photo)
                } else {
                    setGeneralError(data.message || "Failed to load news")
                }
            } catch (error) {
                console.error("Error fetching news:", error)
                setGeneralError("Connection error. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchNews()
    }, [id])

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
        if (!validateForm() || !news) return

        setIsSubmitting(true)
        setGeneralError("")

        try {
            const requestBody = {
                title: name,
                text: description,
                ...(photoUrl && { attachment: { url: photoUrl } })
            }

            const resp = await fetch(`${API_URL}/news/${news.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            })

            const data = await resp.json()

            if (resp.ok && data.success) {
                // Actualizar sessionStorage si existe
                const newsStr = sessionStorage.getItem("news")
                if (newsStr) {
                    const newsList: News[] = JSON.parse(newsStr)
                    const updatedNews: News = {
                        id: news.id,
                        name,
                        description,
                        photo: photoUrl
                    }
                    const actualizados = newsList.map((n) => n.id === news.id ? updatedNews : n)
                    sessionStorage.setItem("news", JSON.stringify(actualizados))
                }
                
                // Navegar de vuelta a la lista de noticias
                navigate("/admin/news")
            } else {
                setGeneralError(data.data || data.message || "Failed to update news")
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

    // Mostrar loading mientras se carga la noticia
    if (isLoading) {
        return (
            <div className="NewsEdit-container">
                <div className="NewsEdit-loading">
                    <div className="NewsEdit-spinner"></div>
                    <p>Loading news...</p>
                </div>
            </div>
        )
    }

    // Mostrar error si no se pudo cargar la noticia
    if (!news && !isLoading) {
        return (
            <div className="NewsEdit-container">
                <div className="NewsEdit-error-container">
                    <h2>Error</h2>
                    <p>{generalError || "News not found"}</p>
                    <button 
                        className="NewsEdit-cancel-btn"
                        onClick={() => navigate("/admin/news")}
                    >
                        Back to News List
                    </button>
                </div>
            </div>
        )
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