import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import User from "../assets/img/user.svg";
import Password from "../assets/img/locked.svg";
import Email from "../assets/img/email.svg";
import Position from "../assets/img/position.svg";
import { Link } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import InputWithLabel from "../components/InputWithLabel";

interface UserRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  position: string;
}

export default function Register() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<UserRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "https://localhost:7261/api/auth/register",
        formData
      );
      const token = response.data;
      localStorage.setItem("token", token);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <LoginLayout>
      <div className="login__box">
        <h1 className="main-title login__title">Register</h1>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            name="username"
            img={User}
            handleChange={handleChange}
            type="text"
          />
          <InputWithLabel
            name="email"
            img={Email}
            handleChange={handleChange}
            type="email"
          />
          <InputWithLabel
            name="password"
            img={Password}
            handleChange={handleChange}
            type="password"
          />
          <InputWithLabel
            label="confirm Password"
            name="confirmPassword"
            img={Password}
            handleChange={handleChange}
            type="password"
          />
          <InputWithLabel
            name="position"
            img={Position}
            handleChange={handleChange}
            type="text"
          />
          {error && <p className="login__error">{error}</p>}
          <button type="submit" className="login__btn btn btn--main">
            Sign up
          </button>
          <p className="login__text">
            Already have an account?{" "}
            <Link to="/login" className="login__link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </LoginLayout>
  );
}
