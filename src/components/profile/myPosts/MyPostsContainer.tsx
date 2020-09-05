//import React from "react";
import { actions } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { MapStatePropsType, MapDispatchPropsType } from "./MyPosts";

let mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    profile: state.profilePage.profile,
  };
};

// refactor
/* let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(actions.addPostActionCreator(post));
    },
    deletePost: (post) => {
      dispatch(actions.deletePostActionCreator(post));
    },
    addLike: (id) => {
      dispatch(actions.addLikeActionCreator(id));
    },
    deleteLike: (id) => {
      dispatch(actions.deleteLikeActionCreator(id));
    }
  };
}; */

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
  deletePost: actions.deletePostActionCreator,
  addLike: actions.addLikeActionCreator,
  deleteLike: actions.deleteLikeActionCreator,
})(MyPosts);

export default MyPostsContainer;
