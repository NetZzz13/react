import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./post/Post";

const MyPosts = (props) => {
  let postElements = props.postsData.map((p) => (
    <Post message={p.message} likeCount={p.likeCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postMessage}>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>Push</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
