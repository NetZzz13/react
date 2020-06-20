import React from "react";
import {
  sendMessageCreator,
  updateNewMessageCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
  return (
    <StoreContext.Consumer>
       {(store) => {
        let state = store.getState().dialogsPage;

        let onSendMessageClick = () => {
          store.dispatch(sendMessageCreator());
        };

        let onMessageChange = (text) => {
          store.dispatch(updateNewMessageCreator(text));
        };
        return (
          <Dialogs
            dialogsPage={state}
            sendMessage={onSendMessageClick}
            updateMessage={onMessageChange}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default DialogsContainer;
