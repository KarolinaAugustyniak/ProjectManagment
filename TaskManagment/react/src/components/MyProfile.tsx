import { Link } from "react-router-dom";
import Settings from "../assets/img/settings.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import UserData from "../interfaces/UserData";

export default function MyProfile() {
  const [user, setUser] = useState<UserData | null>();
  const [imagePath, setImagePath] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7261/api/useraccount/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        response.data.profileImageFileName
          ? setImagePath(
              `https://localhost:7261/images/${response.data.profileImageFileName}`
            )
          : null;
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

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
          <img src={imagePath} className="my-profile__img" />
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
