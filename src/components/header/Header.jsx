import React from "react";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.headerBlock}>
        <NavLink to="/profile">
          <img src={logo} />
          <span>socium.</span>
          </NavLink>
        <div className={s.loginBlock}>
          {props.isAuth ? <NavLink to="/login">{props.login}</NavLink> : <NavLink to="/login">Login</NavLink>}
        </div>
      </div>
    </header>
  );
};

export default Header;
