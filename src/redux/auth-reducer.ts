import { ThunkType } from './redux-store';
import { ResultCodesEnum } from "../api/api";
import { securityAPI } from "../api/security-api";
import { authAPI } from "../api/auth-api";
import { stopSubmit } from "redux-form";
import { InferActionsTypes } from "./redux-store";


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
    case 'AUTH_USER': {
      return { ...state, ...action.payload };
    }

    case 'GET_CAPTCHA_URL_SUCCESS': {
      return { ...state, captchaUrl: action.captchaUrl };
    }

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => {
    return {
      type: 'AUTH_USER',
      payload: { userId, email, login, isAuth },
    } as const;
  },

  getCaptchaUrlSuccess: (captchaUrl: string) => {
    return {
      type: 'GET_CAPTCHA_URL_SUCCESS',
      captchaUrl,
    } as const;
  },
};

//ThunkCreators

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
export const getAuthUserData = (): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    let data = await authAPI.authMe();
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(
        actions.setAuthUserData(
          data.data.id,
          data.data.email,
          data.data.login,
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
): ThunkType<ActionsTypes | ReturnType<typeof stopSubmit>> => {
  return async (dispatch) => {
    let data = await authAPI.login(email, password, rememderMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodesEnum.CaptchaIsRequared) {
        dispatch(getCaptchaUrlTC());
      }
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};

export const logoutThunkCreator = (): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrlTC = (): ThunkType<ActionsTypes> => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptcha();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
