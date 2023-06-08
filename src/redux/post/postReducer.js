// const initialState = {
//   photoPost: "",
//   namePost: "",
//   locationPost: "",
// };

// const postReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SAVE_POSTLOCATION":
//       return {
//         ...state,
//         postLocation: action.payload,
//       };
//     case "SAVE_POSTPHOTO":
//       return {
//         ...state,
//         postPhoto: action.payload,
//       };
//     case "SAVE_POSTNAME":
//       return {
//         ...state,
//         postName: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default postReducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addComment: (state, { payload }) => ({
      comment: payload,
    }),
  },
});

export const { addComment } = postSlice.actions;

export const postReducer = postSlice.reducer;
