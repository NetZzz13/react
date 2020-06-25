import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "bcdb940a-a9b6-414a-8716-5428aa1367ea"
  }
});

export const getUsers = (currentPage = 1, pageSize = 10) => {
  return instance
    .get(`users?page=${currentPage}&count=${pageSize}`
    )
    .then((response) => response.data);
};

export const authMe = () => {
  return instance
  .get(`auth/me`)
  .then((response) => response.data);
};




