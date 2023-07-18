import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { globalVariables } from "../../../styles/globalVariables";

const CustomLink = ({ top, left, color, text, onPress }) => {
  const linkStyle = StyleSheet.compose(styles.link, {
    paddingTop: top,
    paddingLeft: left,
    color,
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={linkStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    textDecorationLine: globalVariables.textDecoration,
  },
});

export default CustomLink;
