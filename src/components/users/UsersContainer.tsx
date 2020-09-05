import React from "react";
import { connect } from "react-redux";
import {
  getUsersThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
} from "../../redux/users-reducer";
import {actions} from "../../redux/sideBar-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
// import { withAuthRedirect } from "../hoc/WithAuthRedirect";
import { compose } from "redux";
import {
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingProgress,
  getUsersSuperSelector,
} from "../../redux/user-selectors";
import { UserType } from "../../types/types";
import { AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  totalUsersCount: number;
  isFetching: boolean;
  users: Array<UserType>;
  followingProgress: Array<number>;
};

type MapDispatchPropsType = {
  getUsersThunkCreator: (currentPage: number, pageSize: number) => void;
  unfollowThunkCreator: (id: number) => void;
  followThunkCreator: (id: number) => void;
  addUserAC: (id: number, name: string, photos: any) => void;
  deleteUserAC: (id: number) => void;
};

type OwnPropsType = {
  pageTitle?: string; //Props, переданные через атрибут
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

export class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }

  onChangePage = (page: number) => {
    this.props.getUsersThunkCreator(page, this.props.pageSize);
  };

  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / 50 / this.props.pageSize
    );

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <>
        {this.props.isFetching ? <Preloader /> : <div>All users</div>}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          onChangePage={this.onChangePage}
          followingProgress={this.props.followingProgress}
          followThunkCreator={this.props.followThunkCreator}
          unfollowThunkCreator={this.props.unfollowThunkCreator}
          addUserAC={this.props.addUserAC}
          deleteUserAC={this.props.deleteUserAC}
        />
      </>
    );
  }
}

/* let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
  };
}; */

//refactor

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersSuperSelector(state),
    //users: getUsersSuper(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state),
  };
};


export default compose(
  //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      followThunkCreator,
      unfollowThunkCreator,
      getUsersThunkCreator,
      addUserAC: actions.addUserAC,
      deleteUserAC: actions.deleteUserAC,
    }
  )
  /* , withAuthRedirect */
)(UsersContainer);
