export const dialogsReducer = (state, action) => {
  switch (action.type) {
    case "SEND-MESSAGE":
      let newMessage = {
        id: 5,
        message: state.newMessageText,
      };
      state.messagesData.push(newMessage);
      state.newMessageText = "";
      return state;
    case "UPDATE-NEW-MESSAGE-TEXT":
      state.newMessageText = action.newText;
      return state;
    default:
      return state;
  }
};

export const sendMessageCreator = () => {
  return {
    type: "SEND-MESSAGE",
  };
};

export const updateNewMessageCreator = (text) => {
  return {
    type: "UPDATE-NEW-MESSAGE-TEXT",
    newText: text,
  };
};

export default dialogsReducer;
