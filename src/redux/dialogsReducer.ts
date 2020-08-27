const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: number;
  name: string;
  avatar: string;
};

type MessageType = {
  id: number;
  message: string;
};

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
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, message: "Hi!" },
    { id: 2, message: "Hey!" },
    { id: 3, message: "Hola!" },
    { id: 4, message: "How are you?" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  //debugger;
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessage;
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData[state.messagesData.length - 1].id + 1,
            message: body,
          },
        ],
      };
    }

    default:
      return state;
  }
};

export type SendMessageActionType = {
  type: typeof SEND_MESSAGE;
  newMessage?: string;
};

export const sendMessageCreator = (
  newMessage: string
): SendMessageActionType => ({
  type: SEND_MESSAGE,
  newMessage,
});

export default dialogsReducer;
