import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { ActionSheetIOS } from "react-native";

export const handleGalleryPress = async (
  buttonPressCount,
  setButtonPressCount,
  setAvatar
) => {
  if (buttonPressCount === 0) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Выбрать из галереи", "Отмена"],
        cancelButtonIndex: 1,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              const selectedAsset = await MediaLibrary.createAssetAsync(
                result.assets[0].uri
              );
              const selectedUri = await MediaLibrary.getAssetInfoAsync(
                selectedAsset
              );
              setAvatar(selectedUri.uri);
              setButtonPressCount(1);
            }
          }
        }
      }
    );
  } else {
    setAvatar("../img/Rectangle-empty.jpg");
    setButtonPressCount(0);
  }
};
