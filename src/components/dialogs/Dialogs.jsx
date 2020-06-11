import React from "react";
import s from "./Dialogs.module.scss";
import Dialog from "./dialog/Dialog";
import Message from "./message/Message";

const Dialogs = (props) => {
  let dialogElements = props.dialogsData.map((d) => (
    <Dialog id={d.id} name={d.name} />
  ));
  let messageElements = props.messagesData.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}> {dialogElements}</div>
      <div className={s.messages}> {messageElements}</div>
    </div>
  );
};

export default Dialogs;
