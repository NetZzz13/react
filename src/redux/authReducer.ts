import { authAPI, securityAPI, ResultCodesEnum } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./reduxStore";

const AUTH_USER = "AUTH_USER";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null | undefined, //if null, then captcha is not required
};

export type InitialStateType = typeof initialState;

export const authReducer = (
  state = initialState,
  action: ActionsTypes
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

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;

type setAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof AUTH_USER;
  payload: setAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => {
  return {
    type: AUTH_USER,
    payload: { userId, email, login, isAuth },
  };
};

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  captchaUrl?: string;
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): GetCaptchaUrlSuccessActionType => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl,
  };
};

//ThunkCreators

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

/* export const getAuthUserData = () => {
  return (dispatch) => {
    return authAPI.authMe().then((response) => {
      if (response.resultCode === 0) {
        dispatch(
          setAuthUserData(
            response.data.id,
            response.data.email,
            response.data.login,
            true
          )
        );
      }
    });
  };
}; */

//refactor
export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.authMe();
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(
        setAuthUserData(
          response.data.id,
          response.data.email,
          response.data.login,
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
): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememderMe, captcha);
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequared) {
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

export const logoutThunkCreator = (): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrlTC = (): ThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
