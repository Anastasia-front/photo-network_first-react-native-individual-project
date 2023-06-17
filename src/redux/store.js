import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice, authReducer } from "./auth/authReducer";
import {
  postSlice,
  postReducer,
  likeSlice,
  likeReducer,
} from "./post/postReducer";

const rootReducers = combineReducers({
  [authSlice.name]: authReducer,
  [postSlice.name]: postReducer,
  [likeSlice.name]: likeReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
