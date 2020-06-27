import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfileThunkCreator } from "../../redux/profileReducer";
import { withRouter, Redirect } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 8908;
    }
    this.props.getProfileThunkCreator(userId);
  }


  /* if (this.props.isAuth == false){
    return <Redirect to="/login"/> 
  } */

  render() {
    if (!this.props.isAuth){
      return <Redirect to="/login"/> 
    }
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let withRouterContainer = withRouter(ProfileContainer);

let mapStateToProps = (state) => {
  return { profile: state.profilePage.profile, isAuth: state.auth.isAuth };
};

export default connect(mapStateToProps, {
  getProfileThunkCreator,
})(withRouterContainer);
