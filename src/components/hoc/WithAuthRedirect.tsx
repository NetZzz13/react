import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  } as MapPropsType;
} ;

type MapPropsType = {
  isAuth: boolean;
};

type DispatchPropsType = {};

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & {}> = (props) => {
    //забираем из props свойство isAuth, а остальное оставляем в объекте restProps
    let { isAuth, ...restProps } = props;

    if (!isAuth) {
      return <Redirect to="/login" />;
    }

    return <Component {...(restProps as WCP)} />;
  };

  const ConnectedAuthRedirectComponent = connect<
    MapPropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
