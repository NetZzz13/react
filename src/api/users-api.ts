import { instance, GetItemsResponseType, APIResponseType } from "./api";

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance
      .get<GetItemsResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`).then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response.data) as Promise<APIResponseType> 
  },
};
