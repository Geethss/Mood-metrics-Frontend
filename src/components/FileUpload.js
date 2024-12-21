import React, { useState } from "react";
import axios from "axios";
import SentimentChart from "./SentimentChart";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError("");
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file before uploading!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/analyze", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResults(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("An error occurred while uploading the file. Please try again.");
        }
    };

    return (
        <div
            style={{
                textAlign: "center",
                padding: "30px",
                background: "linear-gradient(to bottom, #eef2f3, #d9e6f2)",
                minHeight: "100vh",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <h1 style={{ fontSize: "2.8rem", marginBottom: "20px", color: "#004d99" }}>
                Sentiment Analysis Portal
            </h1>
            <div style={{ margin: "20px" }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "1rem",
                    }}
                />
                <button
                    onClick={handleUpload}
                    style={{
                        marginLeft: "10px",
                        padding: "12px 25px",
                        backgroundColor: "#004d99",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#003366")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#004d99")}
                >
                    Upload and Analyze
                </button>
            </div>
            {error && (
                <div
                    style={{
                        color: "red",
                        margin: "10px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                    }}
                >
                    {error}
                </div>
            )}
            {results.length > 0 && (
                <div
                    style={{
                        marginTop: "30px",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        maxWidth: "900px",
                        margin: "30px auto",
                    }}
                >
                    <h2 style={{ marginBottom: "20px", color: "#004d99" }}>Analysis Results</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
                        <SentimentChart data={results} />
                        <pre
                            style={{
                                textAlign: "left",
                                padding: "15px",
                                backgroundColor: "#f8f9fa",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                maxWidth: "400px",
                                maxHeight: "400px",
                                overflowY: "auto",
                                fontSize: "0.9rem",
                                flex: 1,
                            }}
                        >
                            {JSON.stringify(results, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;

