//import React from "react";
import {
  addPostActionCreator,
  deletePostActionCreator,
  addLikeActionCreator,
  deleteLikeActionCreator
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    profile: state.profilePage.profile
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(addPostActionCreator(post));
    },
    deletePost: (post) => {
      dispatch(deletePostActionCreator(post));
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
