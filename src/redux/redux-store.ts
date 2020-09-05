import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Action,
} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sideBarReducer from "./sideBar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";

let rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducers;
//Тип глобального State
export type AppStateType = ReturnType<RootReducerType>;

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

//redux dev tools
// @ts-ignore //строку ниже не типизировать
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

//определение PropertiesTypes объекта <T> (для Actions)
//если тип T является объектом {ключ: значение}, то определи (infer) тип этого значения U и верни его, иначе - never

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never



//ThunkAction - специальный тип для thunk (дженерик)
//<Promise<void> - любая async возвращает Promise; AppStateType - глобальный state , unknown - ExtraArguments, A<string> - наши ActionsTypes>
export type ThunkType<A extends Action> = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  A
>;

// @ts-ignore
window.store = store;

export default store;
