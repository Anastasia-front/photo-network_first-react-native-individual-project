import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { manipulationWithImage } from "./image";

export const uploadPhotoToServer = async (photo, path) => {
  const uniquePostId = Date.now().toString();

  try {
    const response = await fetch(photo);

    const file = await response.blob();

    const imageRef = ref(storage, `${path}/${uniquePostId}`);
    await uploadBytes(imageRef, file);

    return await getDownloadURL(imageRef);
  } catch (error) {
    console.log("uploadPhotoToServer > ", error);
    alert("Відміна додавання фото!");
  }
};

export const pickImage = async () => {
  try {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      const [{ uri }] = assets;

      const newUri = await manipulationWithImage(
        uri,
        [
          {
            resize: { height: 240, width: 240 },
          },
        ],
        0.5
      );
      return newUri;
    }
  } catch (error) {
    console.log(error.message);
  }
};
