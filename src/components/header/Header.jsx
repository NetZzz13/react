import React from "react";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { GrLogout } from "react-icons/gr";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.headerBlock}>
        <NavLink to="/profile">
          <img src={logo} alt="logo" />
          <span>socium.</span>
        </NavLink>
        <div className={s.loginBlock}>
          {props.isAuth ? (
            <NavLink to="/login">
              <div className={s.login}>{props.login}</div>
              <GrLogout onClick={props.logoutThunkCreator}>Logout</GrLogout>
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
