import { initialStateType } from "../users-reducer";
import usersReducer from "../users-reducer";
import { actions } from "../users-reducer";

//initial state
const state: initialStateType = {
  users: [
    {
      id: 0,
      name: "Fillip 0",
      followed: false,
      photos: { small: "sdadas", large: "sdad" },
      status: "status 0",
    },
    {
      id: 1,
      name: "Fillip 1",
      followed: false,
      photos: { small: "sdadas", large: "sdad" },
      status: "status 1",
    },
    {
      id: 2,
      name: "Fillip 2",
      followed: true,
      photos: { small: "sdadas", large: "sdad" },
      status: "status 2",
    },
    {
      id: 3,
      name: "Fillip 3",
      followed: true,
      photos: { small: "sdadas", large: "sdad" },
      status: "status 3",
    },
  ],
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [], // array of users id
  filter: {
    term: "",
    friend: null as null | boolean,
  }
};

test("follow success", () => {
  //action (checking of userReducer)
  const newState = usersReducer(state, actions.followSuccess(1));

  //expect
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
  //action (checking of userReducer)
  const newState = usersReducer(state, actions.unfollowSuccess(3));

  //expect
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
