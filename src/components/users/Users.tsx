import React from "react";
import s from "./Users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { ThunkType } from "../../redux/usersReducer";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  portionSize?: number;
  currentPage: number;
  onChangePage: (pageNumber: number) => void;
  users: Array<UserType>;
  followingProgress: Array<number>
  unfollowThunkCreator: ThunkType
  followThunkCreator: ThunkType
  addUserAC: () => void;
  deleteUserAC: () => void;
}

const Users: React.FC<PropsType> = (props) => {
  /* debugger; */
  return (
    <div className={s.usersBlock}>
      <Paginator
        currentPage={props.currentPage}
        onChangePage={props.onChangePage}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        portionSize={10}
      />
      <div className={s.users}>
        {props.users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingProgress={props.followingProgress}
            unfollowThunkCreator={props.unfollowThunkCreator}
            followThunkCreator={props.followThunkCreator}
            addUserAC={props.addUserAC}
            deleteUserAC={props.deleteUserAC}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
