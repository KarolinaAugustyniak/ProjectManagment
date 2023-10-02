import { useState } from "react";
import axios from "axios";
import Invitation from "../interfaces/Invitation";

const GenerateInvitationCode: React.FC = ({ setInvitationCodes }) => {
  const [expirationDays, setExpirationDays] = useState<number>(7);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleGenerateCode = async () => {
    if (isNaN(expirationDays)) {
      setError("Expiration days must be a number.");
    }
    try {
      const response = await axios.post(
        `https://localhost:7261/api/invitation/generate/${expirationDays}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvitationCodes((prev: Invitation[]) => [...prev, response.data]);
    } catch (error) {
      console.error(error);
      setError("Error generating invitation code");
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value);
    setExpirationDays(days);
  };

  return (
    <div className="settings__group">
      <h3 className="settings__title">Generate Invitation Code</h3>
      <div className="settings__wrapper">
        <label htmlFor="expirationDays">Expiration Days:</label>
        <input
          type="number"
          id="expirationDays"
          value={expirationDays}
          onChange={handleExpirationChange}
          className="input"
          min="1"
        />
      </div>
      <button
        onClick={handleGenerateCode}
        className="small-btn small-btn--center"
      >
        Generate Code
      </button>
      {error && <p className="error center">{error}</p>}
    </div>
  );
};

export default GenerateInvitationCode;
