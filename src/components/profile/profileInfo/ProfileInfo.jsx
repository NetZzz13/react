import React from "react";
import s from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader";
import emptyAvatar from "../../../assets/images/profile.png";
import ProfileStatusWithHooks from "../profileStatus/ProfileStatusWithHooks";


const ProfileInfo = (props) => {
  
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div className={s.profileBlock}>
      <div className={s.profileDescription}>ava + description</div>
      
      <img className={s.profileAvatar} src={props.profile.photos.large ? props.profile.photos.large : emptyAvatar} />
      
      <div className={s.nickname}>{props.profile.fullName}</div>
      <div><ProfileStatusWithHooks status = {props.status} updateStatus={props.updateStatus}/></div>

    </div>
  );
};

export default ProfileInfo;
