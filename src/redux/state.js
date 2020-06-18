let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "Hi, men", likeCount: 10 },
        { id: 2, message: "Congratulations!", likeCount: 3 },
      ],
      newPostText: "it-kamasutra.com",
    },
    dialogsPage: {
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
    },
    sideBar: {
      friendsData: [
        {
          id: 1,
          name: "Alexa",
          avatar:
            "https://images.unsplash.com/photo-1589017763579-6d38c8471cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        },
        {
          id: 2,
          name: "Sergey",
          avatar:
            "https://images.unsplash.com/photo-1548543604-a87c9909abec?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        {
          id: 3,
          name: "Maxim",
          avatar:
            "https://images.unsplash.com/photo-1541260894924-7ff059b93d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        },
      ],
    },
  },

  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer; //паттерн
  },


  dispatch(action) {
    if (action.type === "ADD-POST") {
      let newPost = {
        id: 3,
        message: this._state.profilePage.newPostText,
        likeCount: 0,
      };
      this._state.profilePage.postsData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber();
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber();
    } else if (action.type === "SEND-MESSAGE") {
      let newMessage = {
        id: 5,
        message: this._state.dialogsPage.newMessageText,
      };
      this._state.dialogsPage.messagesData.push(newMessage);
      this._state.dialogsPage.newMessageText = "";
      this._callSubscriber();
    } else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
      this._state.dialogsPage.newMessageText = action.newText;
      this._callSubscriber();
    }
  },
};

export const addPostActionCreator = () => {
  return {
    type: "ADD-POST"
  }
}

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: "UPDATE-NEW-POST-TEXT",
    newText: text
  }
}

export const sendMessageCreator = () => {
  return {
    type: "SEND-MESSAGE"
  }
}

export const updateNewMessageCreator = (text) => {
  return {
    type: "UPDATE-NEW-MESSAGE-TEXT",
    newText: text
  }
}
window.state = store;

export default store;
