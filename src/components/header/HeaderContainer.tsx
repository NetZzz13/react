import React from "react";
import Header from "./Header";
import { logoutThunkCreator } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { MapStatePropsType, MapDispatchPropsType } from "./Header";

class HeaderContainer extends React.Component<
  MapStatePropsType & MapDispatchPropsType
> {
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { logoutThunkCreator })(HeaderContainer);
