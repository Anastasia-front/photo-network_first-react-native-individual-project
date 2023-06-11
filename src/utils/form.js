import { Alert } from "react-native";

export const checkIsDirtyForm = (navigation, { params }) => {
  if (params.isDirtyForm) {
    Alert.alert("Увага!", "При переході дані не зберігаються", [
      {
        text: "Відмінити",
        onPress: () => console.log("Cancel Pressed"),
        // style: 'cancel',
      },
      { text: "Добре", onPress: () => navigation.goBack() },
    ]);
    return;
  }

  navigation.goBack();
};
