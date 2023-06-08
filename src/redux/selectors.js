export const selectName = (state) => state.auth.name;
export const selectEmail = (state) => state.auth.email;
export const selectAvatar = (state) => state.auth.photo;

export const selectPostName = (state) => state.post.postName;
export const selectPostLocation = (state) => state.post.postLocation;
export const selectPostPhoto = (state) => state.post.postPhoto;

export const selectStateChange = (state) => state.auth.stateChange;
export const selectStateUserId = (state) => state.auth.userId;
export const selectStateLogin = (state) => state.auth.login;
export const selectStateEmail = (state) => state.auth.email;
export const selectStateAvatar = (state) => state.auth.photoURL;

export const selectorStateComment = (state) => state.post.comment;
