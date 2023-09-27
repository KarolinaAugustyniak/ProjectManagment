import React, { useEffect, useState } from "react";
import axios from "axios";

const InvitationCodesTable: React.FC = ({ invitationCodes }) => {
  const token = localStorage.getItem("token");
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const onDelete = async () => {};

  return (
    <>
      {invitationCodes ? (
        <table>
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
                  <button onClick={() => onDelete(invitation.invitationId)}>
                    Delete
                  </button>
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
