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

export const likeSlice = createSlice({
  name: "like",
  initialState: {
    like: 0,
  },
  reducers: {
    addLike: (state, { payload }) => ({
      like: payload,
    }),
  },
});

export const { addLike } = likeSlice.actions;

export const likeReducer = likeSlice.reducer;
