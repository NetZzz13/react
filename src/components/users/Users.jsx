import React from "react";
import s from "./Users.module.scss";
import userPhoto from "../../assets/images/profile.png";
import { NavLink } from "react-router-dom";


const Users = (props) => {
  let pagesCount = props.totalUsersCount / 30 / props.pageSize;

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={s.usersBlock}>
        {pages.map((elem) => {
          return (
            <span
              className={props.currentPage === elem ? s.selected : ""}
              onClick={(e) => {
                props.onChangePage(elem);
              }}
            >
              {elem + " "}
            </span>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div className={s.users}>
          <div className={s.user}>
            <div className={s.avaBlock}>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.large != null ? u.photos.large : userPhoto}
                />
              </NavLink>
              {u.followed ? (
                <button
                  disabled={props.followingProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.unfollowThunkCreator(u.id)
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.followThunkCreator(u.id)
                  }}
                >
                  Follow
                </button>
              )}
            </div>
            <div className={s.infoBlock}>
              <div className={s.infoMain}>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </div>
              <div>
                <div>{"u.location.city"}</div>
                <div>{"u.location.country"}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
