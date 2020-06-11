import React from "react";
import s from "./Post.module.scss";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=702&q=80" />
      {props.message}
      <div>
        <span>Like {props.likeCount}</span>
      </div>
    </div>
  );
};

export default Post;
