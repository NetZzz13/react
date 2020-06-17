let rerenderEntireTree = () => {
  console.log("State changed");
};

let state = {
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
    newPostMessageText: "it.com",
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
};

window.state = state;

export const addPost = () => {
  let newPost = { id: 3, message: state.profilePage.newPostText, likeCount: 0 };
  state.profilePage.postsData.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree();
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree();
};

export const addPostMessage = () => {
  let newPost = { id: 5, message: state.dialogsPage.newPostMessageText };
  state.dialogsPage.messagesData.push(newPost);
  state.dialogsPage.newPostMessageText = "";
  rerenderEntireTree();
};

export const updateNewPostMessageText = (newText) => {
  state.dialogsPage.newPostMessageText = newText;
  rerenderEntireTree();
};

export const subscribe = (observer) => {
  rerenderEntireTree = observer //паттерн
}




export default state;
