import React from "react";
import s from "./Friends.module.scss";
import { connect } from "react-redux";

const Friends = (props) => {
  return (
    <div className={s.friendsBlock}>
      <div className={s.friendsTitle}>Friends</div>
      <div className={s.friends}>
        {props.friendsData.map((el) => {
          return (
            <div className={s.friend} key={el.id}>
              <img src={`${el.avatar}`} alt="friend avatar"/>
              <div className={s.friendsName}>{el.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    friendsData: state.sideBar.friendsData
  };
};

export default connect(mapStateToProps, {})(Friends);
