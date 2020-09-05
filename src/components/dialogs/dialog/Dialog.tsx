import React from "react";
import s from "../Dialogs.module.scss";
import { NavLink } from "react-router-dom";


type PropsType = {
  id: number;
  avatar: string | null;
  name: string;
};

const Dialog: React.FC<PropsType> = (props) => {
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={`/dialogs/${props.id}`}>
        <img src={`${props.avatar}`} alt="user's avatar" />
        {props.name}
      </NavLink>
    </div>
  );
};

export default Dialog;
