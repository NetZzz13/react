import React, { useState, ChangeEvent } from "react";
import s from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader";
import emptyAvatar from "../../../assets/images/profile.png";
import ProfileStatusWithHooks from "../profileStatus/ProfileStatusWithHooks";
import ProfileDataForm from "../profileDataForm/ProfileDataForm";
import { FaCloudUploadAlt } from "react-icons/fa";
import MyPostsContainer from "../myPosts/MyPostsContainer";
import { ProfileType, ContacsType } from "../../../types/types";
import { Button } from "antd";


type MapStatePropsType = {
  profile: ProfileType | null;
  isOwner: boolean;
  status: string;
};

type MapDispatchPropsType = {
  updateStatus: (status: string) => void;
  savePhotoTC: (file: File) => void;
  saveProfileFormTC: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<MapStatePropsType & MapDispatchPropsType> = (
  props
) => {
  let [editMode, setEditMode] = useState(false);

  const goToEditMode = () => {
    setEditMode(true);
  };

  const onSubmit = (formData: ProfileType) => {
    props.saveProfileFormTC(formData).then(() => {
      //todo: remove then
      //if form has been saved, turn off edit mode
      setEditMode(false);
    });

    //console.log(formData);
  };

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    //check of choosing file
    //if file exists -  take his length
    if (e.target.files && e.target.files.length) {
      props.savePhotoTC(e.target.files[0]);
    }
  };

  return (
    <div className={s.profileBlock}>
      <div className={s.profileMainBlock}>
        <div className={s.profileShortInfo}>
          <div className={s.profileAvatar}>
            <img
              src={
                props.profile.photos.large
                  ? props.profile.photos.large
                  : emptyAvatar
              }
              alt="profile avatar"
            />

            {props.isOwner && (
              <div className={s.changePhoto}>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <FaCloudUploadAlt />
                  <span>Upload</span>
                </label>
                <input
                  type={"file"}
                  id="file-upload"
                  onChange={onMainPhotoSelected}
                />
              </div>
            )}
          </div>
          <div className={s.nickname}>
            <b>{props.profile.fullName}</b>
          </div>
          <div className={s.status}>
            <ProfileStatusWithHooks
              status={props.status}
              updateStatus={props.updateStatus}
              isOwner={props.isOwner}
            />
          </div>
        </div>

        <div className={s.profileContent}>
          {editMode ? (
            <ProfileDataForm
              initialValues={props.profile}
              profile={props.profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={props.profile}
              isOwner={props.isOwner}
              goToEditMode={goToEditMode}
            />
          )}
        </div>
      </div>

      <MyPostsContainer isOwner={props.isOwner} />
    </div>
  );
};

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};

export const Contact: React.FC<ContactsPropsType> = (props) => {
  return (
    <div className={s.contact}>
      <a href={props.contactValue} className={s.contactLink} target="_blank">
        <img
          className={s.iconSocial}
          src={`/socialIcons/${props.contactTitle}.svg`}
          alt={`${props.contactTitle}`}
        />
      </a>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean | null;
  goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
  return (
    <div className={s.profileAllInfo}>
      <div className={s.infoTitle}>
        <b>About me: </b>
        <div className={s.infoText}>{props.profile.aboutMe}</div>
      </div>
      <div className={s.infoTitle}>
        <b>Looking for a job:</b>
        <div className={s.infoText}>
          {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
      </div>
      {props.profile.lookingForAJob ? (
        <div className={s.infoTitle}>
          <b>My skills:</b>
          <div className={s.infoText}>
            {props.profile.lookingForAJobDescription}
          </div>
        </div>
      ) : null}

      <div className={s.infoTitle}>
        <b>Contacts:</b>
        <div className={`${s.infoText} ${s.infoContactIcons}`}>
          {Object.keys(props.profile.contacts).map((elem) =>
            props.profile.contacts[elem as keyof ContacsType] ? (
              <Contact
                key={elem}
                contactTitle={elem}
                contactValue={props.profile.contacts[elem as keyof ContacsType]}
              />
            ) : null
          )}
        </div>
      </div>

      {props.isOwner ? (
        <div>
          <Button
            type="primary"
            className={s.buttonEditProfile}
            onClick={props.goToEditMode}
          >
            Edit
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileInfo;
