import React, { useState } from "react";
import s from "./Post.module.scss";
import userPhoto from "../../../../assets/images/profile.png";
import like from "../../../../assets/images/like.png";

const Post = (props) => {
  let onLike = () => {
    !props.isLike ? props.addLike(props.id) : props.deleteLike(props.id);
  };

  /* let [likeCount, setLike] = useState(props.likeCount);

  let pushMe = () => {
    setLike(likeCount + 1);
  }; */

  return (
    <div className={s.item}>
      <img
        src={props.profile ? props.profile.photos.small : userPhoto}
        alt="user's avatar from dialogs"
      />
      {props.message}
      <div className={s.likeBlock}>
        <span className={s.likeCount}>
          {props.likeCount} {/* {likeCount} */}
        </span>
        <img src={like} className={s.like} alt="likeIcon" onClick={onLike} />
      </div>
    </div>
  );
};

export default Post;
