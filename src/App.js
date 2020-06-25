import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route } from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";

const App = (props) => {
  return (
    <div className="app-wrapper"> 
      <HeaderContainer />
      {<Navbar friendsData={props.store.getState().sideBar.friendsData} />}

      <div className="app-wrapper-content">
        <Route exact path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
        <Route exact path="/users" render={() => <UsersContainer />} />
      </div>
    </div>
  );
};

export default App;
