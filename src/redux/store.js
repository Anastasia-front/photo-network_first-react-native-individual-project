// import { combineReducers } from "redux";
// import postReducer from "./post/postReducer";
// import authReducer from "./auth/authReducer";

// const rootReducer = combineReducers({
//   post: postReducer,
//   auth: authReducer,
// });

// export default rootReducer;

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice, authReducer } from "./auth/authReducer";
import { postSlice, postReducer } from "./post/postReducer";

const rootReducers = combineReducers({
  [authSlice.name]: authReducer,
  [postSlice.name]: postReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__()
  // ),
});
