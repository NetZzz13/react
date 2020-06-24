import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setUsers,
  setUsersTotalCount,
  setCurrentPage,
  toogleIsFetching,
} from "../../redux/usersReducer";
import Users from "./Users";
import * as axios from "axios";
import Preloader from "../common/Preloader";

export class UsersAPIContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.toogleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toogleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setUsersTotalCount(response.data.totalCount);
      });
  }

  onChangePage = (page) => {
    this.props.setCurrentPage(page);
    this.props.toogleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.toogleIsFetching(false);
        this.props.setUsers(response.data.items);
      });
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
        {this.props.isFetching ? <Preloader /> : null}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          onChangePage={this.onChangePage}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

const UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setUsersTotalCount,
  setCurrentPage,
  toogleIsFetching,
})(UsersAPIContainer);

export default UsersContainer;
