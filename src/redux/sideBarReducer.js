const initialState = {
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
};


export const sideBarReducer = (state = initialState, action) => {
  //some code
  return state;
};





export default sideBarReducer;
