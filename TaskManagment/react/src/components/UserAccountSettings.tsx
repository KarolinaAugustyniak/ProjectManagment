import React, { useState } from "react";
import axios from "axios";

const UserAccountSettings: React.FC = () => {
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    position: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "https://localhost:7261/api/UserAccount/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setSuccessMessage(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setError("Somethig went wrong. Try again later.");
    }
  };

  return (
    <div>
      <h3>User account information</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">New Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="position">New Position</label>
          <input
            type="text"
            name="position"
            id="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default UserAccountSettings;
