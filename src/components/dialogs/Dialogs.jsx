import React from "react";
import s from "./Dialogs.module.scss";
import Dialog from "./dialog/Dialog";
import Message from "./message/Message";

const Dialogs = (props) => {
  let dialogElements = props.dialogsPage.dialogsData.map((d) => (
    <Dialog id={d.id} key={d.id} name={d.name} avatar={d.avatar} />
  ));
  let messageElements = props.dialogsPage.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let onSendMessageClick = () => {
    props.sendMessage();
  };

  let onMessageChange = (e) => {
    let body = e.target.value;
    props.updateMessage(body);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}> {dialogElements}</div>
      <div>
        <div className={s.messages}> {messageElements}</div>
        <textarea
          value={props.dialogsPage.newMessageText}
          onChange={onMessageChange}
          /* placeholder="Enter your message" */
        ></textarea>
        <button onClick={onSendMessageClick}>Add post</button>
      </div>
    </div>
  );
};

export default Dialogs;
