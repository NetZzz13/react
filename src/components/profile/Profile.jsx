import React from "react";
import s from "./Profile.module.scss";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={s.profile}>
      <ProfileInfo
        profile={props.profile}
        isOwner={props.isOwner}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhotoTC={props.savePhotoTC}
        saveProfileFormTC={props.saveProfileFormTC}
      />
    </div>
  );
};

export default Profile;
