import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const AUTH_USER = "AUTH_USER";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null, //if null, then captcha is not required
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      return { ...state, ...action.payload };
    }

    case GET_CAPTCHA_URL_SUCCESS: {
      return { ...state, captchaUrl: action.captchaUrl };
    }

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => {
  return {
    type: AUTH_USER,
    payload: { userId, email, login, isAuth },
  };
};

export const getCaptchaUrlSuccess = (captchaUrl) => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl,
  };
};

/* export const getAuthUserData = () => {
  return (dispatch) => {
    return authAPI.authMe().then((response) => {
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
}; */

//refactor
export const getAuthUserData = () => {
  return async (dispatch) => {
    let response = await authAPI.authMe();
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
  };
};

export const loginThunkCreator = (email, password, rememderMe, captcha) => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememderMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC());
      }
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};

export const logoutThunkCreator = () => {
  return async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrlTC = () => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
