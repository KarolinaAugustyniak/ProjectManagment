import React from "react";

interface UserInformationProps {
  username: string;
  image?: string;
}

export default function User({ username, image }: UserInformationProps) {
  const imagePath = image ? `https://localhost:7261/images/${image}` : null;

  return (
    <div className="user">
      {imagePath && <img src={imagePath} className="user__img" />}
      <p>{username}</p>
    </div>
  );
}
