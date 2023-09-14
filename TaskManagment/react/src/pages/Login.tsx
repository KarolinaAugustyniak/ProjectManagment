import React, { useState } from "react";
import axios from "axios";
import User from "../assets/img/user.svg";
import Password from "../assets/img/locked.svg";
import { Link } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import InputWithLabel from "../components/InputWithLabel";
import { useNavigate } from 'react-router-dom';

interface UserLogin {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
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
      navigate('/welcome');
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <LoginLayout>
      <div className="login__box">
        <h1 className="main-title login__title">Login</h1>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            name="username"
            img={User}
            handleChange={handleChange}
            type="text"
          />
          <InputWithLabel
            name="password"
            img={Password}
            handleChange={handleChange}
            type="password"
          />
          {error && <p className="login__error">{error}</p>}
          <button type="submit" className="login__btn btn btn--main">
            Log In
          </button>
          <p className="login__text">
            Doesn’t have an account?{" "}
            <Link to="/register" className="login__link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </LoginLayout>
  );
}
