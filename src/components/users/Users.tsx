import React, { useEffect } from "react";
import s from "./Users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType, PhotosType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import {
  FilterType,
  getUsersThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
} from "../../redux/users-reducer";
import { useSelector, useDispatch } from "react-redux";
import {
  getTotalUsersCount,
  getCurrentPage,
  getPageSize,
  getUsersFilter,
  getUsers,
  getFollowingProgress,
} from "../../redux/user-selectors";
import { actions } from "../../redux/sideBar-reducer";

type PropsType = {
  portionSize?: number;
};

export const Users: React.FC<PropsType> = (props) => {
  //useSelector() - хук, принимающий в себя в селектор (селектор - принимает весь state и возвращает его часть)
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsers);
  const followingProgress = useSelector(getFollowingProgress);

  //useDispatch() - хук, принимающий в себя action или thunk
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
  }, []);

  const onChangePage = (pageNumber: number) => {
    dispatch(
      getUsersThunkCreator(
        pageNumber,
        pageSize,
        filter //пример замыкания, т.е. filter может быть взят из параметров функции, если его там нет - выше, т.е. выпрыгивает в область видимости вышестоящей
      )
    );
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter));
  };

  const follow = (id: number) => {
    dispatch(followThunkCreator(id));
  };

  const unfollow = (id: number) => {
    dispatch(unfollowThunkCreator(id));
  };

  const addUser = (id: number, name: string, photos: any) => {
    dispatch(actions.addUserAC(id, name, photos));
  };

  const deleteUser = (id: number) => {
    dispatch(actions.deleteUserAC(id));
  };

  return (
    <div className={s.usersBlock}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        totalUsersCount={totalUsersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onChangePage={onChangePage}
        portionSize={10}
      />
      <div className={s.users}>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingProgress={followingProgress}
            unfollowThunkCreator={unfollow}
            followThunkCreator={follow}
            addUserAC={addUser}
            deleteUserAC={deleteUser}
          />
        ))}
      </div>
    </div>
  );
};
