import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import { connect } from "react-redux";
import { setUsersProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    //debugger;
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then((response) => {
        this.props.setUsersProfile(response.data);
      });

  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let withRouterContainer = withRouter(ProfileContainer);

let mapStateToProps = (state) => {
  return { profile: state.profilePage.profile };
};

export default connect(mapStateToProps, {
  setUsersProfile,
})(withRouterContainer);
