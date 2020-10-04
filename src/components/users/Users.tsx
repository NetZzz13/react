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
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

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

  //для синхронизации url
  const history = useHistory();

  //useDispatch() - хук, принимающий в себя action или thunk
  const dispatch = useDispatch();

  //при вводе url заполнять фильтры
  useEffect(() => {
   
    const parsed = queryString.parse(history.location.search.substr(1)) as {
      term: string;
      page: string;
      friend: string;
    };
    debugger;
    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = +parsed.page;
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };
    if (!!parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend:
          parsed.friend === "null"
            ? null
            : parsed.friend === "true"
            ? true
            : false,
      };

    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
  }, []);

  //при вводе фильтров и запроса заполнять url
  useEffect(() => {
    //обрезаем term и friend в urle, если их нет
    const query: any = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      /* search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`, */
      search: queryString.stringify(query), // автогенерирование строки
    });
  }, [filter, currentPage]);

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
