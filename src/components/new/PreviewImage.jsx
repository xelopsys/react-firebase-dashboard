import React, { useState } from 'react'
import './new.scss'

function PreviewImage({ file }) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setImagePreviewUrl(reader.result)
    }

    return (
        <div className="fileImg">
            <img src={imagePreviewUrl} alt="Preview" width="100%" height="100%" style={{ borderRadius: "50%" }} />
        </div>
    )
}

export default PreviewImage