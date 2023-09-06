import React, { useState } from "react";
import LoginImage from "../assets/img/business-growth.png";
import Logo from "../assets/img/task-managment.svg";
import User from "../assets/img/user.svg";
import Password from "../assets/img/locked.svg";

import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleInputClick = () => {};
  return (
    <div className="login">
      <div className="login__left">
        <img src={Logo} className="login__logo" />
        <div className="login__box">
          <h1 className="main-title login__title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-border">
              <div className="input-border__wrapper">
                <img src={User} />
                <label htmlFor="username" className="input-border__label">
                  Username:
                </label>
              </div>
              <input
                type="text"
                name="username"
                className="input-border__input"
                onClick={handleInputClick}
              />
            </div>
            <div className="input-border">
              <div className="input-border__wrapper">
                <img src={Password} />
                <label htmlFor="password" className="input-border__label">
                  Password:
                </label>
              </div>
              <input
                type="password"
                name="password"
                className="input-border__input"
                onClick={handleInputClick}
              />
            </div>

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
      </div>
      <img src={LoginImage} className="login__right" />
    </div>
  );
}
