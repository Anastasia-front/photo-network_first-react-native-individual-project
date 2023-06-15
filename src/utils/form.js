import { Alert } from "react-native";

export const attention = (navigation, { params }) => {
  if (params.isDirtyForm) {
    Alert.alert(
      "Підтвердження!",
      "Дані видаляться після виходу зі сторінки. Виконати переход?",
      [
        {
          text: "Ні",
          onPress: () => console.log("Cancel"),
        },
        { text: "Так", onPress: () => navigation.goBack() },
      ]
    );
    return;
  }

  navigation.goBack();
};
