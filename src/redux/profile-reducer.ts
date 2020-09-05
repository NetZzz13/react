import { PostType, ProfileType, PhotosType } from "../types/types";
import { ResultCodesEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { stopSubmit } from "redux-form";
import { InferActionsTypes, ThunkType } from "./redux-store";

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
 /*  newPostText: "", */
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "ADD_POST": {
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

    case "DELETE_POST": {
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    }

    case "SET_USERS_PROFILE": {
      return { ...state, profile: action.profile };
    }

    case "SET_STATUS": {
      return { ...state, status: action.status };
    }

    case "SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }

    case "ADD_LIKE": {
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

    case "DELETE_LIKE": {
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

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addPostActionCreator: (post: string) => {
    return {
      type: "ADD_POST",
      post,
    } as const;
  },
  deletePostActionCreator: (postId: number) => {
    return {
      type: "DELETE_POST",
      postId,
    } as const;
  },
  addLikeActionCreator: (id: number) => {
    return {
      type: "ADD_LIKE",
      id,
    } as const;
  },
  deleteLikeActionCreator: (id: number) => {
    return {
      type: "DELETE_LIKE",
      id,
    } as const;
  },
  setUsersProfile: (profile: ProfileType) => {
    return {
      type: "SET_USERS_PROFILE",
      profile,
    } as const;
  },
  setUserStatus: (status: string) => {
    return {
      type: "SET_STATUS",
      status,
    } as const;
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: "SAVE_PHOTO_SUCCESS",
      photos,
    } as const;
  },
};

//ThunkAction - специальный тип для thunk
//<Promise<void> - любая async возвращает Promise; AppStateType - глобальный state , unknown - ExtraArguments, Action<string> - наши ActionsTypes>



export const getProfileThunkCreator = (userId: number): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUsersProfile(data));
  };
};

export const getStatusThunkCreator = (userId: number): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(data));
  };
};

export const updateStatusThunkCreator = (status: string): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  };
};

export const savePhotoTC = (file: File): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfileFormTC = (profile: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === ResultCodesEnum.Success) {
    //after click on Save button - show current user with new data
    dispatch(getProfileThunkCreator(userId));
  } else {
    dispatch(
      stopSubmit("profileEditForm", { _error: data.messages[0] })
    );
    //if there is mistake in form - show mistake
    return Promise.reject(data.messages[0]);
  }
};
export default profileReducer;
