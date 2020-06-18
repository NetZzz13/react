import React from "react";
import s from "./ProfileInfo.module.scss";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1574&q=80" />
      </div>
      <div className={s.profileDescription}>ava + description</div>
    </div>
  );
};

export default ProfileInfo;