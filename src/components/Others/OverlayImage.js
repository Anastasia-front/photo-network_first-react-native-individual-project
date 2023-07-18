import { Image, StyleSheet, View } from "react-native";

import { globalVariables } from "../../../styles/globalVariables";

const OverlayImage = ({ top }) => {
  const imageStyle = StyleSheet.compose(styles.overlayImage, {
    marginTop: top,
  });

  return <View style={imageStyle} />;
};

const styles = StyleSheet.create({
  overlayImage: {
    backgroundColor: globalVariables.color.white,
    width: 390,
    height: 710,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default OverlayImage;
