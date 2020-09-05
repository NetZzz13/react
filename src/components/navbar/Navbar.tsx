import React from "react";
import s from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
import Friends from "./friends/Friends";
import { FriendType } from "../../redux/sideBar-reducer";
import { AppStateType } from "../../redux/redux-store";
import { connect } from "react-redux";

type PropsType = {};

const Navbar: React.FC<PropsType> = (props) => {
  return (
    <nav className={s.nav}>
      <NavLink
        to="/profile"
        activeClassName={s.activeLink}
        className={`${s.item} ${s.active}`}
      >
        Profile
      </NavLink>

      <NavLink to="/dialogs" activeClassName={s.activeLink} className={s.item}>
        Messages
      </NavLink>

      <NavLink to="/users" activeClassName={s.activeLink} className={s.item}>
        Users
      </NavLink>

      <NavLink to="/news" activeClassName={s.activeLink} className={s.item}>
        News
      </NavLink>

      <NavLink to="/music" activeClassName={s.activeLink} className={s.item}>
        Music
      </NavLink>

      <NavLink to="/settings" activeClassName={s.activeLink} className={s.item}>
        Settings
      </NavLink>

      <Friends />
    </nav>
  );
};

export default Navbar;
