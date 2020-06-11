import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

let postsData = [
  { id: 1, message: "Hi, men", likeCount: 10 },
  { id: 2, message: "Congratulations!", likeCount: 3 },
];

let dialogsData = [
  { id: 1, name: "Alisa" },
  { id: 2, name: "Sweta" },
  { id: 3, name: "Pawel" },
  { id: 4, name: "Zhenya" },
];

let messagesData = [
  { id: 1, message: "Hi!" },
  { id: 2, message: "Hey!" },
  { id: 3, message: "Hola!" },
  { id: 4, message: "How are you?" },
];

ReactDOM.render(
  <App
    postsData={postsData}
    dialogsData={dialogsData}
    messagesData={messagesData}
  />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
