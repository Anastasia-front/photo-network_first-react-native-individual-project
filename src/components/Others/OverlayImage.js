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
    borderTopLeftRadius: globalVariables.radius.overlay,
    borderTopRightRadius: globalVariables.radius.overlay,
    borderBottomLeftRadius: globalVariables.radius.none,
    borderBottomRightRadius: globalVariables.radius.none,
  },
});

export default OverlayImage;
