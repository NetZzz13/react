import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  updateStatusThunkCreator,
  savePhotoTC,
  saveProfileFormTC,
} from "../../redux/profile-reducer";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

//автоопределение пропсов из mapStateToProps
type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  getProfileThunkCreator: (userId: number) => void;
  getStatusThunkCreator: (userId: number) => void;
  updateStatusThunkCreator: (status: string) => void;
  savePhotoTC: (file: File) => void;
  saveProfileFormTC: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;


class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;

    if (!userId) {
      userId = this.props.authorizedUserId;

      if (!userId) {
        this.props.history.push("/login");
      }
    }

    this.props.getProfileThunkCreator(userId as number);
    this.props.getStatusThunkCreator(userId as number);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatusThunkCreator}
          savePhotoTC={this.props.savePhotoTC}
          saveProfileFormTC={this.props.saveProfileFormTC}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    savePhotoTC,
    saveProfileFormTC,
  }),
  withRouter
)(ProfileContainer);
