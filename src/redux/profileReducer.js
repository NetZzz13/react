import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
  postsData: [
    { id: 1, message: "Hi, men", likeCount: 10 },
    { id: 2, message: "Congratulations!", likeCount: 3 },
  ],
  newPostText: "it-kamasutra.com",
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: state.newPostText,
        likeCount: 0,
      };
      return {
        ...state,
        newPostText: "",
        postsData: [...state.postsData, newPost],
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostText: action.newPostText };
    }

    case SET_USERS_PROFILE: {
      return { ...state, profile: action.profile };
    }

    case SET_STATUS: {
      return { ...state, status: action.status };
    }

    default:
      return state;
  }
};

export const addPostActionCreator = () => {
  return {
    type: ADD_POST,
  };
};

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text,
  };
};

export const setUsersProfile = (profile) => {
  return {
    type: SET_USERS_PROFILE,
    profile,
  };
};

export const setUserStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const getProfileThunkCreator = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then((data) => {
      dispatch(setUsersProfile(data));
    });
  };
};

export const getStatusThunkCreator = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setUserStatus(response));
    });
  };
};

export const updateStatusThunkCreator = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {

      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

export default profileReducer;
