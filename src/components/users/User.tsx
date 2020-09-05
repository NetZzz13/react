import React from "react";
import s from "./User.module.scss";
import userPhoto from "../../assets/images/profile.png";
import { NavLink } from "react-router-dom";
import { UserType, PhotosType } from "../../types/types";

type MapPropsType = {
  user: UserType;
  followingProgress: Array<number>;
  
};

type MapDispatchType = {
  unfollowThunkCreator: (id: number) => void;
  followThunkCreator: (id: number) => void;
  addUserAC: (id: number, name: string, photos: any) => void;
  deleteUserAC: (id: number) => void;
};

const User: React.FC<MapPropsType & MapDispatchType> = (props) => {
  return (
    <div className={s.user}>
      <div className={s.userName}>{props.user.name}</div>

      <div className={s.userAvatar}>
        <NavLink to={"/profile/" + props.user.id}>
          <img
            src={
              props.user.photos.large != null
                ? props.user.photos.large
                : userPhoto
            }
            alt="user avatar from profile"
          />
        </NavLink>
      </div>

      <div className={s.usersFollowing}>
        {" "}
        {props.user.followed ? (
          <button
            disabled={props.followingProgress.some(
              (id) => id === props.user.id
            )}
            onClick={() => {
              props.unfollowThunkCreator(props.user.id);
              //delete user from array of friends
              props.deleteUserAC(props.user.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={props.followingProgress.some(
              (id) => id === props.user.id
            )}
            onClick={() => {
              props.followThunkCreator(props.user.id);
              //add user to array of friends
              props.addUserAC(
                props.user.id,
                props.user.name,
                props.user.photos.large
              );
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
