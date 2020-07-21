//import React from "react";
import {
  addPostActionCreator,
  addLikeActionCreator,
  deleteLikeActionCreator,
  successLikeActionCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    profile: state.profilePage.profile,
    isLike: state.profilePage.isLike
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(addPostActionCreator(post));
    },
    addLike: (id) => {
      dispatch(addLikeActionCreator(id));
    },
    deleteLike: (id) => {
      dispatch(deleteLikeActionCreator(id));
    }
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
