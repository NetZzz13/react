import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  let state = props.store.getState();

  let addNewPost = () => {
    props.store.dispatch(addPostActionCreator());
  };

  let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action);
  };

  return (
    <MyPosts
      addPost={addNewPost}
      updateNewPostText={onPostChange}
      postsData={state.profilePage.postsData}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;
