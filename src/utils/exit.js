import { authSignOutUser } from "../redux/auth/authOperations";
import { Alert } from "react-native";

export const exit = (dispatch) => {
  Alert.alert("Підтвердження!", "Ви дійсно хочете вийти з додатку?", [
    {
      text: "Ні",
      onPress: () => console.log("Cancel"),
    },
    {
      text: "Так",
      onPress: () => {
        dispatch(authSignOutUser());
      },
    },
  ]);
};
