import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfileThunkCreator } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/WithAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 8908;
    }
    this.props.getProfileThunkCreator(userId);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { profile: state.profilePage.profile };
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
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
