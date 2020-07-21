import React from "react";
//import s from "./Profile.module.scss";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        isOwner={props.isOwner}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhotoTC={props.savePhotoTC}
        saveProfileFormTC = {props.saveProfileFormTC}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
