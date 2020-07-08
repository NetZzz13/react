import React, { useState } from "react";
import s from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader";
import emptyAvatar from "../../../assets/images/profile.png";
import ProfileStatusWithHooks from "../profileStatus/ProfileStatusWithHooks";
import ProfileDataForm from "../profileDataForm/ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  const goToEditMode = () => {
    setEditMode(true);
  };

  const onSubmit = (formData) => {
    
    props.saveProfileFormTC(formData).then(() => {
      //if form has been saved, turn off edit mode
      setEditMode(false);
    });

    //console.log(formData);
  };

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    //check of choosing file
    if (e.target.files.length) {
      props.savePhotoTC(e.target.files[0]);
    }
  };

  return (
    <div className={s.profileBlock}>
       <div className={s.nickname}>
        <b>{props.profile.fullName}</b>
      </div>
      <div>
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
      <img
        className={s.profileAvatar}
        src={
          props.profile.photos.large ? props.profile.photos.large : emptyAvatar
        }
      />
      <div>{props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}</div>
      


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
  );
};

export const Contact = (props) => {
  return (
    <div>
      <b>{props.contactTitle}</b> : {props.contactValue}
    </div>
  );
};

const ProfileData = (props) => {
  return (
    <div>
      

      <div>
        <b>About me: </b> {props.profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job:</b> {props.profile.lookingForAJob ? "yes" : "no"}
        {props.profile.lookingForAJob
          ? <div><b>My professional skills:</b> {props.profile.lookingForAJobDescription}</div>
          : ""}
      </div>

      <div>
        <b>Contacts:</b>
        <div className={s.contacts}>
          {Object.keys(props.profile.contacts).map((elem) => (
            (props.profile.contacts[elem] ? <Contact
              key={elem}
              contactTitle={elem}
              contactValue={props.profile.contacts[elem]}
            /> : '')

            
          ))}
        </div>
      </div>
      <div>
        {props.isOwner ? (
          <div>
            <button onClick={props.goToEditMode}>Edit</button>
          </div>
        ) : (
          ""
        )}
      </div >
    </div>
  );
};

export default ProfileInfo;
