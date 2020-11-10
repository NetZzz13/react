import { createSelector } from "reselect";
import { AppStateType } from "../redux-store";

//селектор - функция, которая принимает весь state и достаёт из него часть.
export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getUsersSuperSelector = createSelector(getUsers, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingProgress = (state: AppStateType) => {
  return state.usersPage.followingProgress;
};

export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
