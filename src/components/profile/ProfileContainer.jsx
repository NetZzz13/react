import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
 
  getProfileThunkCreator,
} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 8908;
    }

    this.props.getProfileThunkCreator(userId);

    /*  getProfile(userId).then((data) => {
      this.props.setUsersProfile(data);
    }); */
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
  getProfileThunkCreator,
})(withRouterContainer);
