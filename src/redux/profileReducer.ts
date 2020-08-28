import { PostType, ProfileType, PhotosType } from './../types/types';
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
    {
      id: 1,
      message: "This is my first message",
      likeCount: 10,
      isLike: false,
    },
    {
      id: 2,
      message: "Hi! I'm an musician. Maybe, can you make collab?",
      likeCount: 3,
      isLike: false,
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
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
            ? { ...elem, likeCount: elem.likeCount - 1, isLike: false }
            : elem
        ),
        //isLike: false
      };
    }

    default:
      return state;
  }
};

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST;
  post: string;
};

export const addPostActionCreator = (
  post: string
): AddPostActionCreatorActionType => {
  return {
    type: ADD_POST,
    post,
  };
};

type DeletePostActionCreatorActionType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePostActionCreator = (
  postId: number
): DeletePostActionCreatorActionType => {
  return {
    type: DELETE_POST,
    postId,
  };
};

type AddLikeActionCreatorActionType = {
  type: typeof ADD_LIKE;
  id: number;
};

export const addLikeActionCreator = (
  id: number
): AddLikeActionCreatorActionType => {
  return {
    type: ADD_LIKE,
    id,
  };
};

type DeleteLikeActionCreatorActionType = {
  type: typeof DELETE_LIKE;
  id: number;
};

export const deleteLikeActionCreator = (
  id: number
): DeleteLikeActionCreatorActionType => {
  return {
    type: DELETE_LIKE,
    id,
  };
};

type SetUsersProfileCreatorActionType = {
  type: typeof SET_USERS_PROFILE;
  profile: ProfileType;
};

export const setUsersProfile = (
  profile: ProfileType
): SetUsersProfileCreatorActionType => {
  return {
    type: SET_USERS_PROFILE,
    profile,
  };
};

type SetUserStatusCreatorActionType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setUserStatus = (
  status: string
): SetUserStatusCreatorActionType => {
  return {
    type: SET_STATUS,
    status,
  };
};

type SavePhotoSuccessCreatorActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessCreatorActionType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};

export const getProfileThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getProfile(userId).then((response: any) => {
      dispatch(setUsersProfile(response.data));
    });
  };
};

export const getStatusThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getStatus(userId).then((response: any) => {
      dispatch(setUserStatus(response.data));
    });
  };
};

export const updateStatusThunkCreator = (status: any) => {
  return (dispatch: any) => {
    profileAPI.updateStatus(status).then((response: any) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

export const savePhotoTC = (file: any) => {
  return (dispatch: any) => {
    profileAPI.savePhoto(file).then((response: any) => {
      if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
      }
    });
  };
};

export const saveProfileFormTC = (profile: any) => async (
  dispatch: any,
  getState: any
) => {
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