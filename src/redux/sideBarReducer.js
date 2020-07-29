import userPhoto from "../assets/images/profile.png";

const ADD_USER_TO_FRIENDS = "ADD_USER_TO_FRIENDS";
const DELETE_USER_FROM_FRIENDS = "DELETE_USER_FROM_FRIENDS";

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
  ],
};

export const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_TO_FRIENDS: {
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

    case DELETE_USER_FROM_FRIENDS: {
      return {
        ...state,
        friendsData: state.friendsData.filter((u) => u.id !== action.id),
      };
    }

    default:
      return state;
  }
};

export const addUserAC = (id, name, avatar) => {
  return {
    type: ADD_USER_TO_FRIENDS,
    id,
    name,
    avatar,
  };
};

export const deleteUserAC = (id) => {
  return {
    type: DELETE_USER_FROM_FRIENDS,
    id,
  };
};

export default sideBarReducer;
