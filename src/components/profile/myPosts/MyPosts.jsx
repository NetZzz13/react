import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./post/Post";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators/validator";
import { Textarea } from "../../common/FormsControls";

const MyPosts = (props) => {
  let postElements = props.postsData.map((p) => (
    <Post message={p.message} likeCount={p.likeCount} key={p.id} />
  ));

  let addNewPost = (value) => {
    props.addPost(value.post);
    console.log(value);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.postMessage}>
        <AddNewPostFormRedux onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

const maxLength10 = maxLengthCreator(10);

export let AddNewPostForm = (props) => {
  
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name={"post"} placeholder={"Enter post message"} validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Push</button>
      </div>
    </form>
  );
};

export const AddNewPostFormRedux = reduxForm({
  form: "addPostForm",
})(AddNewPostForm);

export default MyPosts;
