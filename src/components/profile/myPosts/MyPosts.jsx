import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./post/Post";
import { Field, reduxForm, reset } from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validator";
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

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postMessage}>
        <AddNewPostFormRedux onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>{postElements.reverse()}</div>
    </div>
  );
};

const maxLength200 = maxLengthCreator(200);

export const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name={"post"}
          placeholder={"Enter post message"}
          validate={[required, maxLength200]}
        />
      </div>
      <div>
        <button>Push</button>
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
