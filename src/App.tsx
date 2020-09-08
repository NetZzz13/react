import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import { UsersPage } from "./components/users/UsersPage";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import { LoginPage } from "./components/login/LoginPage";
import { initializeApp } from "./redux/app-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// type MapPropsType = ReturnType<typeof mapStateToProps>;

type MapPropsType = {
  initialized: boolean;
};

type DispatchPropsType = {
  initializeApp: () => void;
};

/* type OwnPropsType = {
  friendsData: Array<FriendType>
}; */

class App extends React.Component<MapPropsType & DispatchPropsType> {
  /* constructor(props) {
    super(props);
  } */

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />

        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile" />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/users" render={() => <UsersPage />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="*" render={() => <div>404 not found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SocialApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SocialApp;

// window.store = store;
