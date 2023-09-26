import React, { useState } from "react";
import axios from "axios";

const GenerateInvitationCode: React.FC = () => {
  const [expirationDays, setExpirationDays] = useState<number>(7);
  const [error, setError] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const token = localStorage.getItem("token");

  const handleGenerateCode = async () => {
    try {
      const response = await axios.post(`https://localhost:7261/api/invitation/generate/${expirationDays}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInvitationCode(response.data);
    } catch (error) {
      setError("Error generating invitation code");
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value);
    if (!isNaN(days)) {
      setExpirationDays(days);
    }
  };

  return (
    <div>
      <h3>Generate Invitation Code</h3>
      <div>
        <label htmlFor="expirationDays">Expiration Days:</label>
        <input type="number" id="expirationDays" value={expirationDays} onChange={handleExpirationChange} />
      </div>
      <button onClick={handleGenerateCode}>Generate Code</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GenerateInvitationCode;
