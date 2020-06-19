const initialState = {
  dialogsData: [
    {
      id: 1,
      name: "Alisa",
      avatar:
        "https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=694&q=80",
    },
    {
      id: 2,
      name: "Sweta",
      avatar:
        "https://images.unsplash.com/photo-1542534759-05f6c34a9e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 3,
      name: "Pawel",
      avatar:
        "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    },
    {
      id: 4,
      name: "Zhenya",
      avatar:
        "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
    },
  ],
  messagesData: [
    { id: 1, message: "Hi!" },
    { id: 2, message: "Hey!" },
    { id: 3, message: "Hola!" },
    { id: 4, message: "How are you?" },
  ],
  newMessageText: "it.com",
};

export const dialogsReducer = (state = initialState, action) => {
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
