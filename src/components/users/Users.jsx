import React from "react";
import s from "./Users.module.scss";
import * as axios from "axios";
import userPhoto from "../../assets/images/profile.png"


const Users = (props) => {
  if (props.users.length === 0) {
    axios.get("https://social-network.samuraijs.com/api/1.0/users")
    .then(response => {
      props.setUsers(response.data.items)
      })
    /* props.setUsers([
      {
        id: 1,
        followed: false,
        name: "Anna",
        avatarUrl:
          "https://images.unsplash.com/photo-1589017763579-6d38c8471cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        status: "I am travelling now",
        location: { city: "Gomel", country: "Belarus" },
      },
      {
        id: 2,
        followed: true,
        name: "Adam",
        avatarUrl:
          "https://images.unsplash.com/photo-1548543604-a87c9909abec?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        status: "I am busy",
        location: { city: "Minsk", country: "Belarus" },
      },
      {
        id: 3,
        followed: false,
        name: "Simon",
        avatarUrl:
          "https://images.unsplash.com/photo-1541260894924-7ff059b93d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        status: "I am busy too",
        location: { city: "Lviv", country: "Ukraine" },
      },
    ]) */
  }



  return (
    <div>
      {props.users.map((u) => (
        <div className={s.users}>
          <div className={s.user}>
            <div className={s.avaBlock}>
              <img src={u.photos.large != null ? u.photos.large : userPhoto} />
              {u.followed ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button> : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
              
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
