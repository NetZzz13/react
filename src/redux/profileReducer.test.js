import profileReducer, { addPostActionCreator, deletePostActionCreator } from "./profileReducer";
import React from "react";

let state = {
  postsData: [
    { id: 1, message: "Hi, men", likeCount: 10 },
    { id: 2, message: "Congratulations!", likeCount: 3 }
  ],
};

test("length of postData should be incremented", () => {
  //1.Prepare data
  let action = addPostActionCreator("it.com");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. waiting (expectation)
  expect(newState.postsData.length).toBe(3);
});

test("matching of post's text", () => {
  let action = addPostActionCreator("it.com");
  let newState = profileReducer(state, action);
  expect(newState.postsData[2].message).toBe("it.com");
});


test("after deleting length of messages should be decrement", () => {
    let action = deletePostActionCreator(1);
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(1);
  });


 /*  test("after deleting length shouldn't be decrement if it is incorrect", () => {
    let action = deletePostActionCreator(1000);
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(1);
  }); */
