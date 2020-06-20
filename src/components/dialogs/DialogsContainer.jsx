import React from "react";
import {
  sendMessageCreator,
  updateNewMessageCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  let onMessageChange = (text) => {
    props.store.dispatch(updateNewMessageCreator(text));
  };

  return (
    <Dialogs
      dialogsPage={state}
      sendMessage={onSendMessageClick}
      updateMessage={onMessageChange}
    />
  );
};

export default DialogsContainer;
