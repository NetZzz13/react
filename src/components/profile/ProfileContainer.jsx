import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfileThunkCreator, getStatusThunkCreator,updateStatusThunkCreator } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/WithAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 8958;
    }
    this.props.getProfileThunkCreator(userId);
    this.props.getStatusThunkCreator(userId);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusThunkCreator} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { profile: state.profilePage.profile, status: state.profilePage.status};
};

/* let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let withRouterContainer = withRouter(AuthRedirectComponent);


export default connect(mapStateToProps, {
  getProfileThunkCreator,
})(withRouterContainer);
 */

export default compose(
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator
  }),
  withRouter,
  //withAuthRedirect
)(ProfileContainer);
