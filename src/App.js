import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/login/Login";
import { initializeApp } from "./redux/appReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader";
import store from "./redux/reduxStore";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

class App extends React.Component {
  /* constructor(props) {
    super(props);
  } */

  catchAllUnhandledErrors = (PromiseRejectionEvent) => {
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
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div>404 not found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SocialApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SocialApp;

window.store = store;
