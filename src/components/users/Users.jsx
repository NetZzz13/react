import React from "react";
import s from "./Users.module.scss";
import userPhoto from "../../assets/images/profile.png";

const Users = (props) => {
  let pagesCount = (props.totalUsersCount / 50) / props.pageSize;

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
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
              <img src={u.photos.large != null ? u.photos.large : userPhoto} />
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
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
