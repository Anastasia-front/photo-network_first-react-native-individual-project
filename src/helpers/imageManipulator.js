import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const ImageManipulator = async (oldUri, option = [], compressValue) => {
  try {
    const { uri } = await manipulateAsync(oldUri, option, {
      compress: compressValue,
      format: SaveFormat.JPEG,
    });
    return uri;
  } catch (error) {
    console.log('Image Manipulator ====> ', error);
  }
};
