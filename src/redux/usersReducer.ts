import { AppStateType } from "./reduxStore";
import { UserType } from "./../types/types";
import { usersAPI } from "../api/api";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const TOOGLE_FOLLOWING_PROGRESS = "TOOGLE_FOLLOWING_PROGRESS";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>, // array of users id
};

type initialStateType = typeof initialState;

export const usersReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        //users: [...state.users], //но лучше map(), т.к. map создаёт новый массив с теми же самыми юзерами
        users: state.users.map((u: UserType) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((u: UserType) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    }
    case SET_USERS: {
      let stateCopy = {
        ...state,
        users: [...action.users],
      };
      return stateCopy;
    }
    case SET_USERS_TOTAL_COUNT: {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }

    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }

    case TOOGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }

    case TOOGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

type ActionsTypes =
  | FollowSuccessActionType
  | UnfollowSuccessActionType
  | SetUsersActionType
  | setUsersTotalCountActionType
  | setCurrentPageActionType
  | ToogleIsFetchingActionType
  | ToogleFollowingProgressActionType;

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessActionType => {
  return {
    type: FOLLOW,
    userId,
  };
};

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersActionType => {
  return {
    type: SET_USERS,
    users,
  };
};

type setUsersTotalCountActionType = {
  type: typeof SET_USERS_TOTAL_COUNT;
  totalUsersCount: number;
};

export const setUsersTotalCount = (
  totalUsersCount: number
): setUsersTotalCountActionType => {
  return {
    type: SET_USERS_TOTAL_COUNT,
    totalUsersCount,
  };
};

type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (
  currentPage: number
): setCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

type ToogleIsFetchingActionType = {
  type: typeof TOOGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toogleIsFetching = (
  isFetching: boolean
): ToogleIsFetchingActionType => {
  return {
    type: TOOGLE_IS_FETCHING,
    isFetching,
  };
};

type ToogleFollowingProgressActionType = {
  type: typeof TOOGLE_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const toogleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToogleFollowingProgressActionType => {
  return {
    type: TOOGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

//ThunkAction - специальный тип для thunk
//<Promise<void> - любая async возвращает Promise; AppStateType - глобальный state , unknown - ExtraArguments, Action<string> - наши ActionsTypes>

export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch) => {
    dispatch(toogleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(toogleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
  };
};

export const followThunkCreator = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toogleFollowingProgress(true, userId));

    let data = await usersAPI.follow(userId);
    if (data.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
  };
};

export const unfollowThunkCreator = (userId: number): ThunkType => {
  return async (dispatch: any) => {
    dispatch(toogleFollowingProgress(true, userId));

    let data = await usersAPI.unfollow(userId);
    if (data.data.resultCode === 0) {
      dispatch(unfollowSuccess(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
  };
};

export default usersReducer;