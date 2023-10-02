import React, { useState } from "react";
import axios from "axios";

const UserProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const apiUrl = "https://localhost:7261/api/UserAccount/upload";

      const formData = new FormData();
      formData.append("file", selectedFile);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(apiUrl, formData, config);

      console.log("Upload successful:", response.data);
      setSuccessMessage("The image was uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="settings__group">
      <h3 className="settings__title">File Upload</h3>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload} className="small-btn small-btn--center">
        Upload
      </button>
      {successMessage && <p className="success center">{successMessage}</p>}
      {error && <p className="error center">{error}</p>}
    </div>
  );
};

export default UserProfileImage;
