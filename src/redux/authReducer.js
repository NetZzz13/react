import { authAPI } from "../api/api";

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
      return { ...state, ...action.data, isAuth: true };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login) => {
  return {
    type: AUTH_USER,
    data: { id, email, login },
  };
};

export const getAuthMe = () => {
  return (dispatch) => {
    authAPI.authMe().then((response) => {
      if (response.resultCode === 0) {
        dispatch(
          setAuthUserData(
            response.data.id,
            response.data.email,
            response.data.login
          )
        );
      }
    });
  };
};

export default authReducer;
