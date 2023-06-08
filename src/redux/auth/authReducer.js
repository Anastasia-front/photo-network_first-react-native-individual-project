const initState = {
  photo: "",
  name: "",
  email: "",
};

const authhReducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_PHOTO":
      return {
        ...state,
        photo: action.payload,
      };
    case "SAVE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SAVE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default authhReducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  email: null,
  photoURL: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      userId: payload.userId,
      email: payload.email,
      photoURL: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
