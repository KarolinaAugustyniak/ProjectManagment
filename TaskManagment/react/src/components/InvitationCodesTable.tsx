import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseButton from "./CloseButton";

const InvitationCodesTable: React.FC = ({
  invitationCodes,
  setInvitationCodes,
}) => {
  const token = localStorage.getItem("token");
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const onDelete = async (invitationCode) => {
    try {
      await axios.delete(
        `https://localhost:7261/api/invitation/delete/${invitationCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvitationCodes((prev) =>
        prev.filter(
          (invitation) => invitation.invitationCode !== invitationCode
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {invitationCodes ? (
        <table className="invitation-table">
          <thead>
            <tr>
              <th>Invitation Code</th>
              <th>Expire</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {invitationCodes.map((invitation, index) => (
              <tr key={index}>
                <td>{invitation.invitationCode}</td>
                <td>
                  {new Date(invitation.expire).toLocaleString(
                    undefined,
                    dateOptions
                  )}
                </td>
                <td>
                  <CloseButton
                    onClick={() => onDelete(invitation.invitationCode)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invitation codes</p>
      )}
    </>
  );
};

export default InvitationCodesTable;
