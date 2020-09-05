import userPhoto from "../assets/images/profile.png";
import { InferActionsTypes } from "./redux-store";

export type FriendType = {
  id: number;
  name: string;
  avatar: string;
};


const initialState = {
  friendsData: [
    {
      id: 1,
      name: "Alexa",
      avatar:
        "https://images.unsplash.com/photo-1589017763579-6d38c8471cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 2,
      name: "Sergey",
      avatar:
        "https://images.unsplash.com/photo-1548543604-a87c9909abec?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 3,
      name: "Maxim",
      avatar:
        "https://images.unsplash.com/photo-1541260894924-7ff059b93d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    },
  ] as Array<FriendType>,
};

type initialStateType = typeof initialState;

export const sideBarReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'ADD_USER_TO_FRIENDS': {
      return {
        ...state,
        friendsData: [
          ...state.friendsData,
          {
            id:
              action.id /* state.friendsData[state.friendsData.length - 1].id + 1 */,
            name: action.name,
            avatar: action.avatar != null ? action.avatar : userPhoto,
          },
        ],
      };
    }

    case 'DELETE_USER_FROM_FRIENDS': {
      return {
        ...state,
        friendsData: state.friendsData.filter((u) => u.id !== action.id),
      };
    }

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

//для типизации объединяю все action в объект, а возвращаемые значения типизирую как const

export const actions = {
  addUserAC: (id: number, name: string, avatar: any) => {
    return {
      type: 'ADD_USER_TO_FRIENDS',
      id,
      name,
      avatar,
    } as const
  },
  deleteUserAC: (id: number) => {
    return {
      type: 'DELETE_USER_FROM_FRIENDS',
      id,
    } as const
  },
};

export default sideBarReducer;
