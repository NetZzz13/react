
import { InferActionsTypes, ThunkType } from "./redux-store";
import { UserType } from "../types/types";
import { usersAPI } from "../api/users-api";
import { ResultCodesEnum } from "../api/api";

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
    case "FOLLOW": {
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
    case "UNFOLLOW": {
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
    case "SET_USERS": {
      let stateCopy = {
        ...state,
        users: [...action.users],
      };
      return stateCopy;
    }
    case "SET_USERS_TOTAL_COUNT": {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }

    case "SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }

    case "TOOGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }

    case "TOOGLE_FOLLOWING_PROGRESS": {
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

export type ActionsTypes = InferActionsTypes<typeof actions>;

//для типизации объединяю все action в объект

export const actions = {
  followSuccess: (userId: number) => {
    return {
      type: "FOLLOW",
      userId,
    } as const;
  },

  unfollowSuccess: (userId: number) => {
    return {
      type: "UNFOLLOW",
      userId,
    } as const;
  },

  setUsers: (users: Array<UserType>) => {
    return {
      type: "SET_USERS",
      users,
    } as const;
  },

  setUsersTotalCount: (totalUsersCount: number) => {
    return {
      type: "SET_USERS_TOTAL_COUNT",
      totalUsersCount,
    } as const;
  },

  setCurrentPage: (currentPage: number) => {
    return {
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const;
  },

  toogleIsFetching: (isFetching: boolean) => {
    return {
      type: "TOOGLE_IS_FETCHING",
      isFetching,
    } as const;
  },

  toogleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: "TOOGLE_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const;
  },
};



export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    dispatch(actions.toogleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.toogleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCount(data.totalCount));
  };
};

export const followThunkCreator = (userId: number): ThunkType<ActionsTypes>  => {
  return async (dispatch) => {
    dispatch(actions.toogleFollowingProgress(true, userId));

    let data = await usersAPI.follow(userId);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.followSuccess(userId));
    }
    dispatch(actions.toogleFollowingProgress(false, userId));
  };
};

export const unfollowThunkCreator = (userId: number): ThunkType<ActionsTypes>  => {
  return async (dispatch) => {
    dispatch(actions.toogleFollowingProgress(true, userId));

    let data = await usersAPI.unfollow(userId);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.unfollowSuccess(userId));
    }
    dispatch(actions.toogleFollowingProgress(false, userId));
  };
};

export default usersReducer;
