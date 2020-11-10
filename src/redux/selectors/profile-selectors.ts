
import { AppStateType } from "../redux-store";

//селектор - функция, которая принимает весь state и достаёт из него часть.
export const getAvatar = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small
};


