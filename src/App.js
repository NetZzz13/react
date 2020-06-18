import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/dialogs/Dialogs";
import { Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar friendsData={props.state.sideBar.friendsData} />

      <div className="app-wrapper-content">
        <Route
          exact
          path="/dialogs"
          render={() => (
            <Dialogs
              dialogsData={props.state.dialogsPage.dialogsData}
              messagesData={props.state.dialogsPage.messagesData}
              newMessageText={props.state.dialogsPage.newMessageText}
              dispatch={props.dispatch}
            />
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <Profile
              postsData={props.state.profilePage.postsData}
              newPostText={props.state.profilePage.newPostText}
              dispatch={props.dispatch}
            />
          )}
        />
      </div>
    </div>
  );
};

export default App;
