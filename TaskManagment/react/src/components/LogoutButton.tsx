import { useNavigate } from "react-router-dom";
import Logout from "../assets/img/Logout.svg";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="sidebar__logout">
      <img src={Logout} />
      <p> Log out</p>
    </button>
  );
}
