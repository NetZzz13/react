import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./post/Post";
import { Field, reduxForm, reset } from "redux-form";
import { Textarea } from "../../common/FormsControls";

const MyPosts = (props) => {
  let postElements = props.postsData.map((p) => (
    <Post
      id={p.id}
      message={p.message}
      likeCount={p.likeCount}
      isLike={p.isLike}
      key={p.id}
      profile={props.profile}
      deletePost={props.deletePost}
      addLike={props.addLike}
      deleteLike={props.deleteLike}
    />
  ));

  let addNewPost = (value) => {
    props.addPost(value.post);
    //console.log(value);
  };

  return props.isOwner ? (
    <div className={s.postsBlock}>
      <div className={s.postsTitle}>My posts</div>
      <div className={s.postMessage}>
        <AddNewPostFormRedux onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>{postElements.reverse()}</div>
    </div>
  ) : (
    <div className={s.postsBlock}>
      <div className={s.postsTitle}>Posts</div>
    </div>
  );
};

export const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.textAreaPost}>
        <Field
          component={Textarea}
          name={"post"}
          placeholder={"Enter post message"}
          className={s.textareaEditForm}
        />
      </div>
      <div>
        <button className={s.buttonPushPost}>Add Post</button>
      </div>
    </form>
  );
};

export const AddNewPostFormRedux = reduxForm({
  form: "addPostForm",
  //for clear form after sending
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("addPostForm"));
  },
})(AddNewPostForm);

export default MyPosts;
