import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const AUTH_USER = "AUTH_USER";

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      return { ...state, ...action.payload};
    }
    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login, isAuth) => {
  return {
    type: AUTH_USER,
    payload: { id, email, login, isAuth },
  };
};

export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.authMe().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(
          setAuthUserData(
            response.data.data.id,
            response.data.data.email,
            response.data.data.login,
            true
          )
        );
      }
    });
  };
};

export const loginThunkCreator = (email, password, rememderMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememderMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        let action = stopSubmit("login", {_error: message});
        dispatch(action)
      }
    });
  };
};

export const logoutThunkCreator = () => {
  return (dispatch) => {
    authAPI.logout().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(
          setAuthUserData(
            null,
            null,
            null,
            false
          )
        );
      }
    });
  };
};



export default authReducer;
