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
    if (!formData.username || !formData.password || !formData.position) {
      setError("Please fill out at least one field.");
      return;
    }

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
    <div className="settings__group">
      <h3 className="settings__title">User account information</h3>
      <form onSubmit={handleSubmit}>
        <table className="settings__table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">Change Username</label>
              </td>
              <td>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Change Password</label>
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="position">Change Position</label>
              </td>
              <td>
                <input
                  type="text"
                  name="position"
                  id="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="input"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="small-btn small-btn--center">
          Update
        </button>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default UserAccountSettings;
