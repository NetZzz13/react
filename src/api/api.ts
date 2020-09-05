import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
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

export type GetItemsResponseType = {
  items: Array<UserType>;
  totalCount: number;
  error: null | string;
};

export type APIResponseType<D = {}> = {
  data: D;
  resultCode: ResultCodesEnum;
  messages: Array<string>;
}