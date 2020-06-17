import React from "react";
import s from "./Profile.module.scss";
import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        postsData={props.postsData}
        newPostText={props.newPostText}
        dispatch={props.dispatch}
      />
    </div>
  );
};

export default Profile;
