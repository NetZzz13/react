import { getUsers, follow, unfollow, usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const TOOGLE_FOLLOWING_PROGRESS = "TOOGLE_FOLLOWING_PROGRESS";

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        //users: [...state.users], //но лучше map(), т.к. map создаёт новый массив с теми же самыми юзерами
        users: state.users.map((u) => {
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
        users: state.users.map((u) => {
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
          : state.followingProgress.filter((id) => id != action.userId),
      };
    }

    default:
      return state;
  }
};

export const followSuccess = (userId) => {
  return {
    type: FOLLOW,
    userId,
  };
};

export const unfollowSuccess = (userId) => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const setUsersTotalCount = (totalUsersCount) => {
  return {
    type: SET_USERS_TOTAL_COUNT,
    totalUsersCount,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const toogleIsFetching = (isFetching) => {
  return {
    type: TOOGLE_IS_FETCHING,
    isFetching,
  };
};

export const toogleFollowingProgress = (isFetching, userId) => {
  return {
    type: TOOGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toogleIsFetching(true));

    usersAPI.getUsers(currentPage, pageSize).then((response) => {
      dispatch(setCurrentPage(currentPage));
      dispatch(toogleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setUsersTotalCount(response.totalCount));
    });
  };
};

export const followThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toogleFollowingProgress(true, userId));
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toogleFollowingProgress(false, userId));
    });
  };
};

export const unfollowThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toogleFollowingProgress(true, userId));
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toogleFollowingProgress(false, userId));
    });
  };
};

export default usersReducer;
