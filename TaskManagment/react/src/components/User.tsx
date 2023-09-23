import React from "react";
import UserData from "../interfaces/UserData";

export default function User({ user }: UserData) {
  const imagePath = user.profileImageFileName
    ? `https://localhost:7261/images/${user.profileImageFileName}`
    : null;

  return (
    <div className="user">
      {imagePath && <img src={imagePath} className="user__img" />}
      <p>{user.username}</p>
    </div>
  );
}
