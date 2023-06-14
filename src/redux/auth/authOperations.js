// export const savePhoto = (photo) => {
//   return {
//     type: "SAVE_PHOTO",
//     payload: photo,
//   };
// };

// export const saveName = (name) => {
//   return {
//     type: "SAVE_NAME",
//     payload: name,
//   };
// };

// export const saveEmail = (email) => {
//   return {
//     type: "SAVE_EMAIL",
//     payload: email,
//   };
// };

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authReducer";

export const authSignUpUser =
  (login, email, password, photo) => async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });

      const {
        uid,
        displayName,
        email: emailBase,
        photoURL: photoUrlBase,
      } = await auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        photoURL: photoUrlBase,
      };
      dispatch(updateUserProfile(userProfile));
      return user;
    } catch (error) {
      return error.code;
    }
  };

export const authSignInUser = (email, password) => async () => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error.code;
  }
};

// refactor to change avatar or login
export const authUpdateUser =
  ({ avatarURL }) =>
  async (dispatch, state) => {
    try {
      const user = auth.currentUser;

      await updateProfile(user, {
        photoURL: avatarURL,
      });

      const {
        uid,
        displayName,
        email: emailBase,
        photoURL: photoUrlBase,
      } = await auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        photoURL: photoUrlBase,
      };
      dispatch(updateUserProfile(userProfile));
      return userProfile;
    } catch (error) {
      console.log(error);
      return error.code;
    }
  };

export const authUpdateUserLogin =
  ({ login }) =>
  async (dispatch, state) => {
    try {
      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const {
        uid,
        displayName,
        email: emailBase,
        photoURL: photoUrlBase,
      } = await auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        photoURL: photoUrlBase,
      };
      dispatch(updateUserProfile(userProfile));
      return userProfile;
    } catch (error) {
      console.log(error);
      return error.code;
    }
  };

export const authStateChangeUser = () => async (dispatch, state) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch, state) => {
  await signOut(auth);
  dispatch(authStateChange({ stateChange: false }));

  dispatch(authSignOut());
};
