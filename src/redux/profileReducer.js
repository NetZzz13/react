const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";

const initialState = {
  postsData: [
    { id: 1, message: "Hi, men", likeCount: 10 },
    { id: 2, message: "Congratulations!", likeCount: 3 },
  ],
  newPostText: "it-kamasutra.com",
  profile: null,
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

export default profileReducer;
