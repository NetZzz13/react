import React from "react";
import s from "./Dialogs.module.scss";
import Dialog from "./dialog/Dialog";
import Message from "./message/Message";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { Textarea } from "../common/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";

const Dialogs = (props) => {
  let dialogElements = props.dialogsPage.dialogsData.map((d) => (
    <Dialog id={d.id} key={d.id} name={d.name} avatar={d.avatar} />
  ));
  let messageElements = props.dialogsPage.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let addNewMessage = (values) => {
    props.sendMessage(values.message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}> {dialogElements}</div>
      <div>
        <div className={s.messages}> {messageElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};
const maxLength50 = maxLengthCreator(50);

export const AddMessageForm = (props) => {
  
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="your text" name={"message"} component={Textarea} validate={[required, maxLength50]}/>
      </div>
      <button>Add Message</button>
    </form>
  );
};

export const AddMessageFormRedux = reduxForm({
  form: "dialogMessagesForm",
})(AddMessageForm);

export default Dialogs;
