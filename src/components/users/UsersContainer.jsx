import React from "react";
import { connect } from "react-redux";
import UsersC from "./UsersC";
import { followAC, unfollowAC, setUsersAC, setUsersTotalCountAC, setCurrentPageAC } from "../../redux/usersReducer";

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setUsersTotalCount: (totalUsersCount) => {
      dispatch(setUsersTotalCountAC(totalUsersCount));
    },
    setCurrentPage: (page) => {
      dispatch(setCurrentPageAC(page));
    },
    
  };
};
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC);

export default UsersContainer;
