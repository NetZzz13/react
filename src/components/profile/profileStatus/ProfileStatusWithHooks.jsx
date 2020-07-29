import React, { useState } from "react";
import { useEffect } from "react";
import s from "../profileDataForm/ProfileDataForm.module.scss";


const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateMode = () => {
    setEditMode(true);
  };

  const deActivateMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode &&(
        props.isOwner ?
        <div onDoubleClick={activateMode}><b>My status:</b> {props.status || "no status"}</div>
        : <div><b>Status:</b> {props.status || "no status"}</div>
      )}

      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deActivateMode}
            value={status}
            className={s.inputsEditForm}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
