import React from "react";
import s from "./Profile.module.scss";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer
        store={props.store}
      />
    </div>
  );
};

export default Profile;
