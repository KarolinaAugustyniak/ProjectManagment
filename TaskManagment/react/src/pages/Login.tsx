import React, { useState } from "react";
import axios from "axios";
import User from "../assets/img/user.svg";
import Password from "../assets/img/locked.svg";
import { Link } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";

interface UserLogin {
  username: string;
  password: string;
}

export default function Login() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7261/api/auth/login",
        formData
      );
      const token = response.data;
      localStorage.setItem("token", token);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <LoginLayout>
      <div className="login__box">
        <h1 className="main-title login__title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-border">
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              className="input-border__input"
              onChange={handleChange}
            />
            <div className="input-border__wrapper">
              <img src={User} />
              <label htmlFor="username" className="input-border__label">
                Username
              </label>
            </div>
          </div>
          <div className="input-border">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              className="input-border__input"
              onChange={handleChange}
            />
            <div className="input-border__wrapper">
              <img src={Password} />
              <label htmlFor="password" className="input-border__label">
                Password
              </label>
            </div>
          </div>
          {error && <p className="login__error">{error}</p>}
          <button type="submit" className="login__btn btn btn--main">
            Log In
          </button>
          <p className="login__text">
            Doesn’t have an account?{" "}
            <Link to="" className="login__link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </LoginLayout>
  );
}
