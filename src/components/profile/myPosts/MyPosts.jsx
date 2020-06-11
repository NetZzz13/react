import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./post/Post";

const MyPosts = (props) => {
  
  let postElements = props.postsData.map((p) => (
    <Post message={p.message} likeCount={p.likeCount} />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postMessage}>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Push</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
