import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";


const initialState = {
  postsData: [
    { id: 1, message: "Hi, men", likeCount: 10, isLike: false },
    { id: 2, message: "Congratulations!", likeCount: 3, isLike: false },
  ],
  profile: null,
  status: "",
  //isLike: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: state.postsData[state.postsData.length - 1].id + 1,
            message: action.post,
            likeCount: 0,
          },
        ],
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    }

    case SET_USERS_PROFILE: {
      return { ...state, profile: action.profile };
    }

    case SET_STATUS: {
      return { ...state, status: action.status };
    }

    case SAVE_PHOTO_SUCCESS: {
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }

    case ADD_LIKE: {
      return {
        ...state,
        postsData: state.postsData.map((elem) =>
          elem.id === action.id
            ? { ...elem, likeCount: elem.likeCount + 1, isLike: true }
            : elem
        ),
        //isLike: true
      };
    }

    case DELETE_LIKE: {
      return {
        ...state,
        postsData: state.postsData.map((elem) =>
          elem.id === action.id
            ? { ...elem, likeCount: elem.likeCount - 1, isLike: false  }
            : elem
        ),
        //isLike: false
      };
    }

    default:
      return state;
  }
};

export const addPostActionCreator = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

export const deletePostActionCreator = (postId) => {
  return {
    type: DELETE_POST,
    postId
  };
};



export const addLikeActionCreator = (id) => {
  return {
    type: ADD_LIKE,
    id,
  };
};

export const deleteLikeActionCreator = (id) => {
  return {
    type: DELETE_LIKE,
    id,
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

export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};

export const getProfileThunkCreator = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then((response) => {
      dispatch(setUsersProfile(response.data));
    });
  };
};

export const getStatusThunkCreator = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setUserStatus(response.data));
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

export const savePhotoTC = (file) => {
  return (dispatch) => {
    profileAPI.savePhoto(file).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
      }
    });
  };
};

export const saveProfileFormTC = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    //after click on Save button (after ) - show current user with new data
    dispatch(getProfileThunkCreator(userId));
  } else {
    dispatch(
      stopSubmit("profileEditForm", { _error: response.data.messages[0] })
    );
    //if there is mistake in form - show mistake
    return Promise.reject(response.data.messages[0]);
  }
};
export default profileReducer;
