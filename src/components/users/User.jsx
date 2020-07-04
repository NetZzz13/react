import React from "react";
import s from "./User.module.scss";
import userPhoto from "../../assets/images/profile.png";
import { NavLink } from "react-router-dom";

const User = (props) => {
  return (
    <div className={s.user}>
      <div className={s.avaBlock}>
        <NavLink to={"/profile/" + props.user.id}>
          <img src={props.user.photos.large != null ? props.user.photos.large : userPhoto} />
        </NavLink>
        {props.user.followed ? (
          <button
            disabled={props.followingProgress.some((id) => id === props.user.id)}
            onClick={() => {
              props.unfollowThunkCreator(props.user.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={props.followingProgress.some((id) => id === props.user.id)}
            onClick={() => {
              props.followThunkCreator(props.user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div className={s.infoBlock}>
        <div className={s.infoMain}>
          <div>{props.user.name}</div>
          <div>{props.user.status}</div>
        </div>
        <div>
          <div>{"u.location.city"}</div>
          <div>{"u.location.country"}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
