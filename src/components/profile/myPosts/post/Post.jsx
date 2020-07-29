import React from "react";
import s from "./Post.module.scss";
import userPhoto from "../../../../assets/images/profile.png";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillCloseSquare } from "react-icons/ai";


const Post = (props) => {
  let onLike = () => {
    !props.isLike ? props.addLike(props.id) : props.deleteLike(props.id);
  };

  /* let [likeCount, setLike] = useState(props.likeCount);

  let pushMe = () => {
    setLike(likeCount + 1);
  }; */


  let onDeletePost = () => {
    props.deletePost(props.id);
    //console.log(value);
  };


  return (
    <div className={s.item}>
      <div className={s.itemDelete}> <AiFillCloseSquare onClick={onDeletePost}/></div>
      <img
        src={props.profile ? props.profile.photos.small : userPhoto}
        alt="user's avatar from dialogs"
      />
      {props.message}
      <div className={s.likeBlock}>
        <span className={s.likeCount}>{props.likeCount} </span>
        <div className={s.like} alt="likeIcon" onClick={onLike}>
          {props.isLike ? <FcLike /> : <FcLikePlaceholder />}
        </div>
      </div>

    </div>
  );
};

export default Post;
