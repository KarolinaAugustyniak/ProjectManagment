import UserData from "../interfaces/UserData";

interface UserProps {
  user: UserData;
}

export default function User({ user }: UserProps) {
  const imagePath = user.profileImageFileName
    ? `https://localhost:7261/images/${user.profileImageFileName}`
    : null;

  return (
    <div className="user" title={user.position}>
      {imagePath && <img src={imagePath} className="user__img" />}
      <p>{user.username}</p>
    </div>
  );
}
