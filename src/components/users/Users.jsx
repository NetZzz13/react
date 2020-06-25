import React from "react";
import s from "./Users.module.scss";
import userPhoto from "../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import * as axios from "axios";

const Users = (props) => {
  let pagesCount = props.totalUsersCount / 30 / props.pageSize;

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
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.large != null ? u.photos.large : userPhoto}
                />
              </NavLink>
              {u.followed ? (
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/` +
                          u.id,
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "bcdb940a-a9b6-414a-8716-5428aa1367ea",
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(u.id);
                        }
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/` +
                          u.id,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "bcdb940a-a9b6-414a-8716-5428aa1367ea",
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(u.id);
                        }
                      });
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
