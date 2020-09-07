import React from "react";
import s from "./Users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType, PhotosType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType } from "../../redux/users-reducer";

type MapPropsType = {
  totalUsersCount: number;
  pageSize: number;
  portionSize?: number;
  currentPage: number;
  users: Array<UserType>;
  followingProgress: Array<number>;
};

type MapDispatchType = {
  onChangePage: (pageNumber: number) => void;
  unfollowThunkCreator: (id: number) => void;
  followThunkCreator: (id: number) => void;
  addUserAC: (id: number, name: string, photos: any) => void;
  deleteUserAC: (id: number) => void;
  onFilterChanged: (filter: FilterType) => void
};

const Users: React.FC<MapPropsType & MapDispatchType> = (props) => {
  /* debugger; */
  return (
    <div className={s.usersBlock}>
      <UsersSearchForm  onFilterChanged= {props.onFilterChanged} />
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
