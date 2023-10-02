import React, { useEffect, useState } from "react";
import axios from "axios";
import InvitationCodesTable from "./InvitationCodesTable";
import Invitation from "../interfaces/Invitation";

interface InvitationCodesProps {
  invitationCodes: Invitation[];
  setInvitationCodes: React.Dispatch<React.SetStateAction<Invitation[]>>;
}

const InvitationCodes: React.FC<InvitationCodesProps> = ({
  invitationCodes,
  setInvitationCodes,
}) => {
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7261/api/invitation/invitations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvitationCodes(response.data);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  return (
    <div className="settings__group">
      <h3 className="settings__title">Invitation Codes</h3>
      <InvitationCodesTable
        invitationCodes={invitationCodes}
        setInvitationCodes={setInvitationCodes}
      />
      {error && <p className="error center">{error}</p>}
    </div>
  );
};

export default InvitationCodes;
