import { useNavigate } from "react-router-dom";
import Logout from "../assets/img/Logout.svg";
import { useUser } from "../context/UserContext";

export default function LogoutButton() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setUser(null);
  };

  return (
    <button onClick={handleLogout} className="sidebar__logout">
      <img src={Logout} />
      <p> Log out</p>
    </button>
  );
}
