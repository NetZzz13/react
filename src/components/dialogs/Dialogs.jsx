import React from "react";
import s from "./Dialogs.module.scss";
import Dialog from "./dialog/Dialog";
import Message from "./message/Message";
import { reduxForm, Field, reset } from "redux-form";
import { Textarea } from "../common/FormsControls";
import { maxLengthCreator, required, minLengthCreator } from "../../utils/validators/validator";

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
const minLength1 = minLengthCreator(1);


export const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Enter your message"
          name={"message"}
          component={Textarea}
          className={s.textareaEditForm}
          
          validate={[required, minLength1, maxLength50 ] }
         
        />
      </div>
      <button className={s.buttonPushPost}>Add Message</button>
    </form>
  );
};

export const AddMessageFormRedux = reduxForm({
  form: "dialogMessagesForm",
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("dialogMessagesForm"));
  },
})(AddMessageForm);

export default Dialogs;
