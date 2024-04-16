import React, { useState } from 'react';
import axios from 'axios';

function ImageAnalyzer() {
    const [image, setImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const set = () => test

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            console.log(image)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            alert('Please select an image first!');
            return;
        }

        try {
            const response = await axios.post('https://api.openai.com/v1/vision/tasks', {
                image: './image/새.jpg',  // Base64-encoded image content (without prefix)
                model: "gpt-4-turbo"  // Assuming we're using this model; check for the correct model name
            }, {
                headers: {
                    'Authorization': '',
                    'Content-Type': 'application/json'
                }
            });
            setAnalysisResult(response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to analyze the image');
        }
    };

    return (
        <div>
            <h1>Image Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button type="submit">Analyze Image</button>
            </form>
            {analysisResult && (
                <div>
                    <h2>Analysis Result</h2>
                    <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ImageAnalyzer;
