import { ProfileType } from "./../types/types";
import axios, { AxiosResponse } from "axios";
import { UserType, PhotosType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "8c30f1cf-e89e-4749-a5c5-8a9d3391b6d1",
  },
});

// enum - перечисление;
// enum-перечисление для resultCode позволяет удобно его интерпретировать при написании кода

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequared = 10,
}

//любой get,post и т.п. является дженериком (т.е. можем описать, что "сидит" в response в data) и возвращает promise!

// .get<string> описывает, что вернёт сервер (Response). 2 варианта:
// instance.get(`auth/me`).then((response: AxiosResponse<string>) => response.data.toUpperCase()) //.toUpperCase() метод строки
// instance.get<string>(`auth/me`).then((response) => response.data.toUpperCase())

type AuthMeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: number;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { userId: number };
  resultCode: number;
  messages: Array<string>;
};

type LogoutResponseType = {
  data: {};
  resultCode: number;
  messages: Array<string>;
};

export const authAPI = {
  authMe() {
    return instance
      .get<AuthMeResponseType>(`auth/me`)
      .then((response) => response.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null
  ) {
    return instance.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete<LogoutResponseType>(`auth/login`);
  },
};

type GetUsersResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: null | string;
};

type FollowUnfollowResponseType = {
  data: any;
  messages: Array<string>;
  resultCode: number;
};

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance
      .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post<FollowUnfollowResponseType>(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`);
  },
};

type UpdateStatusResponseType = {
  data: any;
  messages: Array<string>;
  resultCode: number;
};

type SaveProfileResponseType = {
  data: any;
  messages: Array<string>;
  resultCode: number;
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put<UpdateStatusResponseType>(`profile/status/`, {
      status: status,
    });
  },
  savePhoto(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put(`profile/photo/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<SaveProfileResponseType>(`profile`, profile);
  },
};


type GetCaptchResponseType = {
  url: string
};


export const securityAPI = {
  getCaptcha() {
    return instance.get<GetCaptchResponseType>("security/get-captcha-url");
  },
};
