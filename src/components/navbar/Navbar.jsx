import React from "react";
import s from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className={s.nav}>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <a>News</a>
      </div>
      <div className={s.item}>
        <a>Music</a>
      </div>
      <div className={s.item}>
        <a>Settings</a>
      </div>

      <div className={s.friendsBlock}>
        <div className={s.friendsTitle}>Friends</div>
          <div className={s.friends}>
            {props.friendsData.map((el) => {
              return (
                <div className={s.friend}>
                  <img src={`${el.avatar}`} />
                  <div className={s.friendsName}>{el.name}</div>
                </div>
              );
            })}
          </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
