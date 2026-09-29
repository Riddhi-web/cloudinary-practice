import { useState } from 'react'
import './App.css'

function App() {
    
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();

        formData.append("image", file);

        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        setImageUrl(data.secure_url);
        console.log(data);
    };

    return (
        <div>
            <h1>Cloudinary Upload</h1>

            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files[0]);
                }}
            />

            <button onClick={handleUpload}>Upload</button>
            {imageUrl && <img src={imageUrl} />}
        </div>

    );
}

export default App;