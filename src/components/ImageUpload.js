import { useState } from "react";
import axios from "axios";

function ImageUpload() {
    const [file, setFile] = useState(null);

    const handleChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Upload success: " + res.data);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default ImageUpload;

