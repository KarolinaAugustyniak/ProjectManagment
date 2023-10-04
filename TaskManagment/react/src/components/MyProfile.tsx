import { Link } from "react-router-dom";
import Settings from "../assets/img/settings.svg";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export default function MyProfile() {
  const { user } = useUser();
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (user && user.profileImageFileName) {
      setImagePath(
        `https://localhost:7261/images/${user.profileImageFileName}`
      );
    } else {
      setImagePath("");
    }
  }, [user]);

  return (
    <div className="my-profile">
      <div className="my-profile__top">
        <h2 className="title">My profile</h2>
        <Link to="/settings">
          <img src={Settings} />
        </Link>
      </div>
      {user && (
        <div className="my-profile__bottom">
          {imagePath && <img src={imagePath} className="my-profile__img" />}
          <div>
            <p className="my-profile__username">{user.username}</p>
            <p className="my-profile__position">{user.position}</p>
            <p className="my-profile__email">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}
