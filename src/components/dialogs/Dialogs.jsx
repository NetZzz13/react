import React from "react";
import s from "./Dialogs.module.scss";
import Dialog from "./dialog/Dialog";
import Message from "./message/Message";
import { sendMessageCreator, updateNewMessageCreator } from "../../redux/dialogsReducer";

const Dialogs = (props) => {
  let dialogElements = props.dialogsData.map((d) => (
    <Dialog id={d.id} name={d.name} avatar={d.avatar} />
  ));
  let messageElements = props.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  let onSendMessageClick = () => {
    props.dispatch(sendMessageCreator());
  };

  let onMessageChange = (e) => {
    let text = e.target.value;
    props.dispatch(updateNewMessageCreator(text));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}> {dialogElements}</div>
      <div>
        <div className={s.messages}> {messageElements}</div>
        <textarea
          value={props.newMessageText}
          onChange={onMessageChange}
          /* placeholder="Enter your message" */
        ></textarea>
        <button onClick={onSendMessageClick}>Add post</button>
      </div>
    </div>
  );
};

export default Dialogs;
