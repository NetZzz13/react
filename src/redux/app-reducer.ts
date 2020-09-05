import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
  initialized: false as boolean,
};

export type InitialStateType = typeof initialState;

export const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "INITIALIZED_SUCCESS": {
      return { ...state, initialized: true };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  initializedSuccess: () => {
    return {
      type: "INITIALIZED_SUCCESS",
    } as const;
  },
};

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    //dispatch(somethingElse())
    Promise.all([promise]).then(() => {
      dispatch(actions.initializedSuccess());
    });
  };
};

export default appReducer;
