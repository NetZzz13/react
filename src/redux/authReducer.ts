import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const AUTH_USER = "AUTH_USER";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";


const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, //if null, then captcha is not required
};

export type InitialStateType = typeof initialState;

export const authReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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

type setAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type setAuthUserDataActionType = {
  type: typeof AUTH_USER;
  payload: setAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setAuthUserDataActionType => {
  return {
    type: AUTH_USER,
    payload: { userId, email, login, isAuth },
  };
};

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  captchaUrl?: string;
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): getCaptchaUrlSuccessActionType => {
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
  return async (dispatch: any) => {
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

export const loginThunkCreator = (
  email: string,
  password: string,
  rememderMe: boolean,
  captcha: string
) => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrlTC = () => {
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
