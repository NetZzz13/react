import React, { useState, ChangeEvent } from "react";
import { useEffect } from "react";
import s from "../profileDataForm/ProfileDataForm.module.scss";


type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;

}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
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

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode &&(
        props.isOwner ?
        <div ><b>My status:</b> <span onClick={activateMode} className={s.status}>{props.status || "no status"}</span></div>
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
