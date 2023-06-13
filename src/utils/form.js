import { Alert } from "react-native";

export const attention = (navigation, { params }) => {
  if (params.isDirtyForm) {
    Alert.alert("Дані видаляться після виходу зі сторінки. Виконати переход?", [
      {
        text: "Ні",
        onPress: () => console.log("Cancel"),
        // style: 'cancel',
      },
      { text: "Так", onPress: () => navigation.goBack() },
    ]);
    return;
  }

  navigation.goBack();
};
