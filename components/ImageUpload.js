import React, { useState } from "react";

import { API_URL } from "@/config/index";

const ImageUpload = ({ evtID, imageUploaded }) => {
    const [imageUp, setImageUp] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("files", imageUp);
        formData.append("ref", "events");
        formData.append("refId", evtID);
        formData.append("field", "image");

        const res = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            console.log("uploaded");
            imageUploaded();
        }
    };
    const handleFileChange = (e) => {
        setImageUp(e.target.files[0]);
    };

    return (
        <div className="image_upload">
            <h2>Upload Event Image</h2>
            <form onSubmit={handleSubmit}>
                <div className="file">
                    <input type="file" onChange={handleFileChange} />
                </div>

                <button>Uplaod</button>
            </form>
        </div>
    );
};

export default ImageUpload;
