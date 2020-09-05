import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./post/Post";
import { Field, reduxForm, reset, InjectedFormProps } from "redux-form";
import { Textarea } from "../../common/FormsControls";
import { PostType, ProfileType } from "../../../types/types";

export type MapStatePropsType = {
  postsData: Array<PostType>;
  profile: ProfileType | null;
};

export type MapDispatchPropsType = {
  addPost: (post: string) => void;
  deletePost: (id: number) => void;
  addLike: (id: number) => void;
  deleteLike: (id: number) => void;
};

type MapOwnPropsType = {
  isOwner: boolean;
};

type AddPostFormValuesType = {
  post: string;
};

type AddPostFormOwnProps = {};

const MyPosts: React.FC<MapStatePropsType & MapDispatchPropsType & MapOwnPropsType> = (props) => {
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

  let addNewPost = (value: AddPostFormValuesType) => {
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

export const AddNewPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, AddPostFormOwnProps> &
    AddPostFormOwnProps
> = (props) => {
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

export const AddNewPostFormRedux = reduxForm<
  AddPostFormValuesType,
  AddPostFormOwnProps
>({
  form: "addPostForm",
  //for clear form after sending
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("addPostForm"));
  },
})(AddNewPostForm);

export default MyPosts;
