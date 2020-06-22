import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import { Route } from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      {<Navbar friendsData={props.store.getState().sideBar.friendsData} />}

      <div className="app-wrapper-content">
        <Route exact path="/dialogs" render={() => <DialogsContainer />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/users" render={() => <UsersContainer />} />
      </div>
    </div>
  );
};

export default App;
