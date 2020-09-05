import React from "react";
import s from "./Profile.module.scss";
import ProfileInfo from "./profileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType  | null;
  isOwner: boolean;
  status: string;
  updateStatus: (status: string) => void;
  savePhotoTC: (file: File) => void;
  saveProfileFormTC: (profile: ProfileType) => Promise<any>;
}

const Profile: React.FC<PropsType> = (props) => {
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
