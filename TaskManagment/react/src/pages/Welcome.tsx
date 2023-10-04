import { useState } from "react";
import axios from "axios";
import InputWithLabel from "../components/InputWithLabel";
import Pen from "../assets/img/pen.svg";
import Group from "../assets/img/group.svg";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const [joinError, setJoinError] = useState("");
  const token = localStorage.getItem("token");

  const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(e.target.value);
  };

  const handleChangeJoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvitationCode(e.target.value);
  };

  const handleSubmitCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://localhost:7261/api/Organizations",
        JSON.stringify(organization),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
  };

  const handleSubmitJoin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://localhost:7261/api/Invitation/join/${invitationCode}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setJoinError(err.response.data);
    }
  };

  return (
    <div className="welcome">
      <h1 className="main-title welcome__title">Welcome!</h1>
      <h2 className="welcome__heading">You have been succesfully registered</h2>
      <div className="welcome__wrapper">
        <div className="welcome__side">
          <h3>Create new organization</h3>
          <form onSubmit={handleSubmitCreate} className="welcome__form">
            <InputWithLabel
              name="organizationName"
              label="organization Name"
              img={Pen}
              handleChange={handleChangeCreate}
              value={organization}
              type="text"
            />
            <button type="submit" className="btn btn--main">
              Submit
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
        <p className="welcome__or">or</p>
        <div className="welcome__side">
          <h3>Join existing organization</h3>
          <form onSubmit={handleSubmitJoin} className="welcome__form">
            <InputWithLabel
              name="invitationCode"
              label="invitation Code"
              img={Group}
              value={invitationCode}
              handleChange={handleChangeJoin}
              type="text"
            />
            <button type="submit" className="btn btn--main">
              Submit
            </button>
            {joinError && <p className="error">{joinError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
