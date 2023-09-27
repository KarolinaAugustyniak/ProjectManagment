import React, { useEffect, useState } from "react";
import axios from "axios";
import InvitationCodesTable from "./InvitationCodesTable";

const InvitationCodes: React.FC = () => {
  const [error, setError] = useState("");
  const [invitationCodes, setInvitationCodes] = useState("");
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

  const handleDelete = async (invitationId) => {
    try {
      await axios.delete(
        `https://localhost:7261/api/invitation/${invitationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvitationCodes((prevInvitations) =>
        prevInvitations.filter(
          (invitation) => invitation.invitationId !== invitationId
        )
      );
    } catch (error) {
      setError("Error deleting invitation");
    }
  };

  return (
    <div>
      <h3>Invitation Codes</h3>
      <InvitationCodesTable
        invitationCodes={invitationCodes}
        onDelete={handleDelete}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InvitationCodes;
