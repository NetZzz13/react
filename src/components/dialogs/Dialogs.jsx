import React from "react";
import s from "./Dialogs.module.scss";
import Dialog from "./dialog/Dialog";
import Message from "./message/Message";

const Dialogs = (props) => {
  let dialogElements = props.dialogsData.map((d) => (
    <Dialog id={d.id} name={d.name} avatar={d.avatar} />
  ));
  let messageElements = props.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  let newPostElement = React.createRef();

  let addNewPostMessage = () => {
    props.dispatch({type: "ADD-POST-MESSAGE"});
  };

  let onPostMessageChange = () => {
    let text = newPostElement.current.value;
    props.dispatch({type: "UPDATE-NEW-POST-MESSAGE-TEXT", newText: text});
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}> {dialogElements}</div>
      <div>
        <div className={s.messages}> {messageElements}</div>
        <textarea
          onChange={onPostMessageChange}
          ref={newPostElement}
          value={props.newPostMessageText}
        ></textarea>
        <button onClick={addNewPostMessage}>Add post</button>
      </div>
    </div>
  );
};

export default Dialogs;
