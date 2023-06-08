export const savePostLocation = (location) => ({
  type: "SAVE_POSTLOCATION",
  payload: location,
});

export const savePostName = (postname) => {
  return {
    type: "SAVE_POSTNAME",
    payload: postname,
  };
};

export const savePostPhoto = (postphoto) => {
  return {
    type: "SAVE_POSTPHOTO",
    payload: postphoto,
  };
};
