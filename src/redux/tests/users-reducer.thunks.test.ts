import { APIResponseType, ResultCodesEnum } from "../../api/api";
import {
  followThunkCreator,
  unfollowThunkCreator,
  actions,
} from "../users-reducer";
import { usersAPI } from "../../api/users-api";

//thunk - совокупность dispatch-ей + async + dispatch-и
//test of thunk - тест ТОЛЬКО dispatch-ей, а не async
//вместо async - фейковый mock

jest.mock("../api/users-api"); //подменяем usersAPI (далее usersAPI - ненастоящий)
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success followThunk", async () => {
  const thunk = followThunkCreator(1);
  const dispatchMock = jest.fn(); //fake dispatch
  const getStateMock = jest.fn(); //fake dispatch

  //у любой thunk 3 аргумента:dispatch, getState, extraArguments
  await thunk(dispatchMock, getStateMock, {});

  //ожидаем, что произойдёт 3 dispatch-а (из followThunkCreator)
  expect(dispatchMock).toBeCalledTimes(3);
  //первый вызов - actions.toogleFollowingProgress(true, 3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toogleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toogleFollowingProgress(false, 1)
  );
});

test("success unfollowThunk", async () => {
  const thunk = unfollowThunkCreator(1);
  const dispatchMock = jest.fn(); //fake dispatch
  const getStateMock = jest.fn(); //fake dispatch

  //у любой thunk 3 аргумента:dispatch, getState, extraArguments
  await thunk(dispatchMock, getStateMock, {});

  //ожидаем, что произойдёт 3 dispatch-а (из followThunkCreator)
  expect(dispatchMock).toBeCalledTimes(3);
  //первый вызов - actions.toogleFollowingProgress(true, 3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toogleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toogleFollowingProgress(false, 1)
  );
});
