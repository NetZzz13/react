import React from "react";
import s from "./Users.module.scss";

const Users = (props) => {
  return (
    <div>
      {props.users.map((u) => (
        <div className={s.users}>
          <div className={s.user}>
            <div className={s.avaBlock}>
              <img src={u.avatarUrl} />
              {u.followed ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button> : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
              
            </div>
            <div className={s.infoBlock}>
              <div className={s.infoMain}>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </div>
              <div>
                <div>{u.location.city}</div>
                <div>{u.location.country}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
