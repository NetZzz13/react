import React from "react";
import s from "./Friends.module.scss";
import { connect } from "react-redux";
import { FriendType } from "../../../redux/sideBar-reducer";
import { AppStateType } from "../../../redux/redux-store";

type PropsType = {
  friendsData: Array<FriendType>;
};

const Friends: React.FC<PropsType> = (props) => {
  return (
    <div className={s.friendsBlock}>
      <div className={s.friendsTitle}>My friends</div>
      <div className={s.friends}>
        {props.friendsData.map((el) => {
          return (
            <div className={s.friend} key={el.id}>
              <img src={`${el.avatar}`} alt="friend avatar" />
              <div className={s.friendsName}>{el.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    friendsData: state.sideBar.friendsData,
  };
};

export default connect(mapStateToProps, {})(Friends);
