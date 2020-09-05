import { instance, APIResponseType } from "./api";
//любой get,post и т.п. является дженериком (т.е. можем описать, что "сидит" в response в data) и возвращает promise!
// .get<string> описывает, что вернёт сервер (Response). 2 варианта:
// instance.get(`auth/me`).then((response: AxiosResponse<string>) => response.data.toUpperCase()) //.toUpperCase() метод строки
// instance.get<string>(`auth/me`).then((response) => response.data.toUpperCase())

//тип для response

type AuthMeDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginDataType = {
  userId: number
};


export const authAPI = {
  authMe() {
    return instance
      .get<APIResponseType<AuthMeDataType>>(`auth/me`)
      .then((response) => response.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null
  ) {
    return instance.post<APIResponseType<LoginDataType>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    }).then((response) => response.data);
  },
  logout() {
    return instance.delete<APIResponseType>(`auth/login`).then((response) => response.data);
  },
};
